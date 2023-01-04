const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const poolData = {
  UserPoolId: "us-east-1_enVD7LHdR",
  ClientId: "bpolauiqv93fgrakcgmuujvq7",
};

const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (!username || !password || !email) {
      throw new Error("Please enter all fields");
    }

    const emailData = {
      Name: "email",
      Value: email,
    };

    const attributesList = [
      new AmazonCognitoIdentity.CognitoUserAttribute(emailData),
    ];

    userPool.signUp(username, password, attributesList, [], (err, result) => {
      if (err) {
        res.status(400).json({ data: err });

        throw new Error(err);
      } else {
        res.status(200).json(result.user);
      }
    });
  } catch (error) {
    res.status(400).json({ data: error });
  }
};

module.exports = { signup };
