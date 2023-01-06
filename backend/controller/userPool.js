const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
require("dotenv").config({ path: "../.env" });

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
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

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let user = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: userPool,
    });

    let authData = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authData, {
      onSuccess: (data) => {
        console.log(`login successful ${data}`);
        res.status(200).json(data);
      },
      onFailure: (err) => {
        console.log(`login unsuccessful ${err}`);
        res.status(400).json(err);
      },
      newPasswordRequired: (data) => {
        console.log(`new password required ${data}`);
        res.status(400).json(data);
      },
    });

    console.log(authData);
  } catch (error) {
    console.log("user dont exist");
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = { signup, login };
