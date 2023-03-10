const express = require("express");

const router = express.Router();
const { publishMsg } = require("../controllers/nats");

router.route("/").post(publishMsg);

module.exports = router;
