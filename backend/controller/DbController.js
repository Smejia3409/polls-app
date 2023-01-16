var AWS = require("aws-sdk");

AWS.config.update({ region: "REGION" });

var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

let;
