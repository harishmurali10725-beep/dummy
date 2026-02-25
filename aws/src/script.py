import boto3
import json

# Create S3 client using environment variables
s3_client = boto3.client('s3')

# Use an existing bucket that your 'intern' user has access to
bucket_name = "demo-bucket-1234567898"  

# Prepare the JSON data to upload
file_name = "sample.json"
json_data = {"Harish": "Future VC of Sky"}

# Upload JSON file to the existing S3 bucket
try:
    s3_client.put_object(
        Bucket=bucket_name,
        Key=file_name,
        Body=json.dumps(json_data),
        ContentType='application/json'
    )
    print(f"JSON file uploaded successfully to bucket '{bucket_name}' as '{file_name}'")
except Exception as e:
    print("Error uploading file:", e)