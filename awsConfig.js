// const AWS = require('aws-sdk');

// AWS.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// module.exports = AWS;

// aws-config.js
const AWS = require('aws-sdk');
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from '@env';

// Set up AWS credentials
AWS.config.credentials = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

// Set up AWS region
AWS.config.update({region: 'ca-central-1'});

module.exports = AWS;
