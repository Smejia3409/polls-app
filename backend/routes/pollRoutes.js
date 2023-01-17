const express = require("express");
const pollRouter = express.Router();

const { getPolls, addPoll } = require("../controller/dbController");

pollRouter.get("/getPolls", getPolls);
pollRouter.put("/addPoll", addPoll);

module.exports = pollRouter;
