const express = require("express");

const router = express.Router();
const { receiveMessage } = require("../controllers/wa");

router.route("/").post(receiveMessage);

module.exports = router;
