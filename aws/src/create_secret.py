import boto3
import json
import time

region = "ap-southeast-2"
secret_name = "sns-topic-arn"
sns_topic_arn = "arn:aws:sns:ap-southeast-2:509726420591:s3-upload-notification"
user_name = "intern"

iam_client = boto3.client('iam')
secrets_client = boto3.client('secretsmanager', region_name=region)

# Step 1: Attach Secrets Manager policy to intern user
secrets_policy = {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
            "secretsmanager:CreateSecret",
            "secretsmanager:UpdateSecret",
            "secretsmanager:GetSecretValue"
        ],
        "Resource": "*"
    }]
}

try:
    iam_client.put_user_policy(
        UserName=user_name,
        PolicyName='SecretsManagerAccess',
        PolicyDocument=json.dumps(secrets_policy)
    )
    print(f"Secrets Manager policy attached to {user_name}")
    print("Waiting for IAM policy to propagate...")
    time.sleep(10)  # Wait for IAM changes to take effect
except Exception as e:
    print(f"Error attaching policy: {e}")

# Step 2: Create secret

try:
    secrets_client.create_secret(
        Name=secret_name,
        SecretString=json.dumps({"SNS_TOPIC_ARN": sns_topic_arn})
    )
    print(f"Secret created: {secret_name}")
except secrets_client.exceptions.ResourceExistsException:
    secrets_client.update_secret(
        SecretId=secret_name,
        SecretString=json.dumps({"SNS_TOPIC_ARN": sns_topic_arn})
    )
    print(f"Secret updated: {secret_name}")
