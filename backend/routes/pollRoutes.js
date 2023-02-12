const express = require("express");
const pollRouter = express.Router();

const {
  getPolls,
  addPoll,
  getSpecificPoll,
  deletePoll,
} = require("../controller/dbController");

pollRouter.get("/getPolls", getPolls);
pollRouter.put("/addPoll", addPoll);
pollRouter.get("/selectedpoll/:id", getSpecificPoll);
pollRouter.delete("/deletepoll/:id", deletePoll);

module.exports = pollRouter;
