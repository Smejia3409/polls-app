var AWS = require("aws-sdk");
require("dotenv").config({ path: "../../.env" });

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.DYNAMO_ACCESS_KEY,
  secretAccessKey: process.env.DYNAMO_SECRET_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "polls";

const getPolls = async (req, res) => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };

    const data = await dynamoClient.scan(params).promise();
    console.log(data);
    res.status(200).json(data.Items);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const addPoll = async (req, res) => {
  try {
    const { id, answers, question, user } = req.body;

    const poll = {
      id: id,
      question: question,
      answers: answers,
      user: user,
    };
    const params = {
      TableName: TABLE_NAME,
      Item: poll,
    };
    const data = await dynamoClient.put(params).promise();
    if (data) {
      console.log(data);
      res.status(200).json(poll);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { getPolls, addPoll };
