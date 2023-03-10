const express = require("express");

const router = express.Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUser,
} = require("../controllers/user");

router.route("/").post(createUser).get(getAllUsers);

router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
