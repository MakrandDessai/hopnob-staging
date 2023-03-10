const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid mobile number",
      ],
      required: [true, "Please provide a mobile number"],
      immutable: true,
      index: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    isClickMatch: {
      type: Boolean,
      default: false,
    },
    latestImageReceived: {
      type: Number,
      default: 0,
    },
    givingFeedback: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
