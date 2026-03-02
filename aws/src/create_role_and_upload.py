import boto3
import json
import time
from botocore.exceptions import ClientError

region = "ap-southeast-2"
bucket_name = "smart-bucket-demo-hyghh564"
role_name = "harish-s3-put-role"

# Create AWS clients
iam = boto3.client("iam")
s3 = boto3.client("s3", region_name=region)


# Step 1: Check if bucket exists, if not create it
try:
    s3.head_bucket(Bucket=bucket_name)
    print("Bucket already exists:", bucket_name)

except ClientError as e:
    error_code = e.response["Error"]["Code"]

    if error_code == "404":
        print("Bucket not found. Creating bucket...")

        s3.create_bucket(
            Bucket=bucket_name,
            CreateBucketConfiguration={
                "LocationConstraint": region
            }
        )

        print("Bucket created:", bucket_name)
    else:
        print("Error while checking bucket:", e)
        raise


# Step 2: Create IAM role (if not exists)
with open("trustpolicy.json", "r") as f:
    trust_policy = json.load(f)

try:
    iam.create_role(
        RoleName=role_name,
        AssumeRolePolicyDocument=json.dumps(trust_policy)
    )
    print("IAM Role created:", role_name)

except iam.exceptions.EntityAlreadyExistsException:
    print("IAM Role already exists:", role_name)


# Step 3: Attach S3 PutObject policy to role
with open("iampolicy.json", "r") as f:
    s3_policy = json.load(f)

# Update bucket ARN in policy
s3_policy["Statement"][0]["Resource"] = f"arn:aws:s3:::{bucket_name}/*"

iam.put_role_policy(
    RoleName=role_name,
    PolicyName="S3PutObjectPolicy",
    PolicyDocument=json.dumps(s3_policy)
)

print("S3 PutObject policy attached")


# Step 4: Upload file to S3 bucket
data = {
    "message": "Hello Harish - bucket already exists",
    "timestamp": int(time.time())
}

try:
    s3.put_object(
        Bucket=bucket_name,
        Key="sample.json",
        Body=json.dumps(data),
        ContentType="application/json"
    )
    print("File uploaded successfully")

except ClientError as e:
    error_code = e.response["Error"]["Code"]
    
    if error_code == "NoSuchBucket":
        print(f"Error: Bucket '{bucket_name}' does not exist. Please create the bucket first.")
    elif error_code == "AccessDenied":
        print(f"Error: Access denied. Check if you have PutObject permission for bucket '{bucket_name}'.")
    else:
        print(f"Error uploading file: {e}")