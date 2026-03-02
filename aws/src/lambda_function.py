import json
import boto3
from botocore.exceptions import ClientError

sns = boto3.client('sns')
secrets_client = boto3.client('secretsmanager')

def get_sns_topic_arn():
    """Retrieve SNS Topic ARN from Secrets Manager"""
    try:
        response = secrets_client.get_secret_value(SecretId='sns-topic-arn')
        secret = json.loads(response['SecretString'])
        return secret['SNS_TOPIC_ARN']
    except ClientError as e:
        print(f"Error retrieving secret: {e}")
        raise

def lambda_handler(event, context):
    print("Event:", event)

    if 'Records' not in event:
        return {'statusCode': 200, 'body': 'Test event'}
    
    record = event.get('Records', [{}])[0]
    s3_data = record.get('s3', {})
    bucket = s3_data.get('bucket', {}).get('name', 'unknown-bucket')
    key = s3_data.get('object', {}).get('key', 'unknown-file')
    size = s3_data.get('object', {}).get('size', 0)
    event_time = record.get('eventTime', 'unknown-time')
    region = record.get('awsRegion', 'unknown-region')
    
    message = f"""S3 Upload Custom Notification

File: {key}
Bucket: {bucket}
Size: {size} bytes
Time: {event_time}
Region: {region}

Upload successful!"""
    
    # Get SNS Topic ARN from Secrets Manager
    try:
        sns_topic_arn = get_sns_topic_arn()
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Failed to retrieve SNS ARN from Secrets Manager: {str(e)}'
        }
    
    # Publish to SNS with exception handling
    try:
        sns.publish(
            TopicArn=sns_topic_arn,
            Subject=f'File Uploaded: {key}',
            Message=message
        )
        print("SNS notification sent successfully")
        return {'statusCode': 200, 'body': 'Notification sent'}
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        
        if error_code == 'AccessDenied' or error_code == 'AuthorizationError':
            error_msg = "Access Denied: Lambda does not have permission to publish to SNS. Please attach SNS publish permissions to the Lambda execution role."
            print(error_msg)
            return {'statusCode': 403, 'body': error_msg}
        else:
            error_msg = f"SNS publish failed: {str(e)}"
            print(error_msg)
            return {'statusCode': 500, 'body': error_msg}
