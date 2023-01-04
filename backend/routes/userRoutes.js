const express = require("express");
const router = express.Router();

const { signup } = require("../controller/userPool");

router.post("/signup", signup);

module.exports = router;
