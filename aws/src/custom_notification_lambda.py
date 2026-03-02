import json
import boto3
import os

sns = boto3.client('sns')

def lambda_handler(event, context):
    record = event['Records'][0]
    bucket = record['s3']['bucket']['name']
    key = record['s3']['object']['key']
    size = record['s3']['object']['size']
    event_time = record['eventTime']
    
    message = f"""
📁 S3 Upload Notification

File: {key}
Bucket: {bucket}
Size: {size} bytes
Time: {event_time}
Region: {record['awsRegion']}

✅ Upload successful!
"""
    
    sns.publish(
        TopicArn=os.environ['SNS_TOPIC_ARN'],
        Subject=f'✅ File Uploaded: {key}',
        Message=message
    )
    
    return {'statusCode': 200}
