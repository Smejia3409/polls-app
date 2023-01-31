const express = require("express");
const pollRouter = express.Router();

const {
  getPolls,
  addPoll,
  getSpecificPoll,
} = require("../controller/dbController");

pollRouter.get("/getPolls", getPolls);
pollRouter.put("/addPoll", addPoll);
pollRouter.get("/selectedpoll", getSpecificPoll);

module.exports = pollRouter;
