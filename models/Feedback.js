const mongoose = require("mongoose");
const validator = require("validator");

const FeedbackSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid mobile number",
      ],
      required: [true, "Please provide a mobile number"],
      immutable: true,
    },
    feedback: {
      type: String,
      required: [true, "Please provide a feedback"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
