// import Config from 'react-native-config';
// // require('dotenv').config();
// import AWS from 'aws-sdk';

// //Passing key info for Dynamodb query
// AWS.config.update({
//   region: 'ca-central-1',
//   // accessKeyId: process.env.AWS_ACCESS_KEY,
//   // accessSecretKey: process.env.AWS_SECRET_KEY,
//   // accessKeyId: Config.AWS_ACCESS_KEY_ID,
//   // secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
//   dynamoDbCrc32: false,
// });

// //Creating Dynamodb client to make queries
// const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

const AWS = require('../../../awsConfig');
AWS.config.update({
  dynamoDbCrc32: false,
});
// DynamoDB client
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

//Category query function to make queries according to different categories
export const categoryQuery = async (category, lastKey) => {
  //Query parameters
  const params = {
    TableName: 'Summize_V4', //Dynamodb Table name
    IndexName: 'GSI1', //Global Secondary Index name
    KeyConditionExpression: 'GSI1PK = :pk ', //Condition for querying
    ExpressionAttributeValues: {
      ':pk': `CATEGORY#${category}`,
      //   ':sk': `TIME#${time}`,
    },
    FilterExpression: 'attribute_exists(#NewsImg)', //Filtering bases on if items in table have NewsImg attribute
    ExpressionAttributeNames: {
      '#NewsImg': 'NewsImg',
    },
    Limit: 9, //setting number of items to receive in response
    ScanIndexForward: false, //ScanIndexForward is set to false to receive the latest data first.
    //Sort key (GSI1SK) is made up of time of the article created
  };

  //add ExclusiveStartKey to params if Last evulated key is received in categoryQuery
  if (lastKey) {
    params.ExclusiveStartKey = lastKey;
  }

  //making request and logging errors
  try {
    const result = await dynamoDBClient.query(params).promise();

    //Return Items and LastEvulatedKey from the response stored in result
    if (result.Items) {
      return {Items: result.Items, LastEvaluatedKey: result.LastEvaluatedKey};
    }
  } catch (error) {
    console.error('Error fetching data from DynamoDB:', error);
    throw error;
  }
};
