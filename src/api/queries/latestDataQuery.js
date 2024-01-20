import Config from 'react-native-config';
import AWS from 'aws-sdk';

// AND GSI1SK = :sk

AWS.config.update({
  region: Config.AWS_REGION,
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  dynamoDbCrc32: false,
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

export const latestDataQuery = async (time, lastKey) => {
  const params = {
    TableName: 'Summize_V4',
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :pk',
    ExpressionAttributeValues: {
      ':pk': `DATE#${time}`,
    },
    FilterExpression: 'attribute_exists(#summary)',
    ExpressionAttributeNames: {
      '#summary': 'summary',
    },
    Limit: 10,
    ScanIndexForward: false,
  };

  //   console.log('Last key: ', lastKey);
  if (lastKey) {
    params.ExclusiveStartKey = lastKey;
  }
  //   console.log('Params: ', params);

  try {
    // console.log('inside try Params: ', params);
    const result = await dynamoDBClient.query(params).promise();
    if (result.Items) {
      return {Items: result.Items, LastEvaluatedKey: result.LastEvaluatedKey};
    }
  } catch (error) {
    console.error('Error fetching data from DynamoDB:', error);
    throw error;
  }
};
