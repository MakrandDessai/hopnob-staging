const mongoose = require("mongoose");
const validator = require("validator");

const ApparelClickAndMatchSchema = new mongoose.Schema(
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
    url: {
      type: String,
      required: [true, "Please provide a url"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ApparelClickAndMatch",
  ApparelClickAndMatchSchema
);
