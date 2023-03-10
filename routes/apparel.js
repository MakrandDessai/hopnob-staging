const express = require("express");

const router = express.Router();
const { getAllApparels, deleteApparel } = require("../controllers/apparel");

router.route("/:id").get(getAllApparels);
router.route("/:id/:apparelId").delete(deleteApparel);

module.exports = router;
