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

export const catQuery = async (category, lastKey) => {
  const params = {
    TableName: 'Summize_V4',
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :pk ',
    ExpressionAttributeValues: {
      ':pk': `CATEGORY#${category}`,
      //   ':sk': `TIME#${time}`,
    },
    Limit: 9,
    ScanIndexForward: false,
  };

  console.log('Last key: ', lastKey);
  if (lastKey) {
    params.ExclusiveStartKey = lastKey;
  }
  //   console.log('Params: ', params);

  try {
    // console.log('inside try Params: ', params);
    const result = await dynamoDBClient.query(params).promise();
    // console.log('Query returned value last key: ', result.LastEvaluatedKey);
    // console.log('Query returned value count: ', result.Count);
    // console.log('Query returned value 0: ', result.Items[0].Headline);

    if (result.Items) {
      return {Items: result.Items, LastEvaluatedKey: result.LastEvaluatedKey};
    }
    // else {
    //   return {dynamoDBData: result.Items, lastEvaluatedKey: null};
    // }
  } catch (error) {
    console.error('Error fetching data from DynamoDB:', error);
    throw error;
  }
};
