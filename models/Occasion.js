/*

id primary key
mobileNumber foreign key
apparelId foreign key
occasions = ["Keep It Casual", "Just Brunchin'", "Work", "Date Night", "Party"]
*/

const mongoose = require("mongoose");
const validator = require("validator");

const OccasionSchema = new mongoose.Schema(
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
    recommendations: {
      type: [[{ type: String }]],
      required: [true, "Please provide recommendations"],
    },
    occasion: {
      type: String,
      enum: ["KeepItCasual", "JustBrunchin", "Work", "DateNight", "Party"],
      required: [true, "Please provide an occasion"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Occasion", OccasionSchema);
