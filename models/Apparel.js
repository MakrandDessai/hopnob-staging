const mongoose = require("mongoose");
const validator = require("validator");

const ApparelSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },
    subcategory: {
      type: String,
      required: [true, "Please provide a subcategory"],
    },
    color: {
      type: String,
      required: [true, "Please provide a color"],
    },
    design: {
      type: String,
      required: [true, "Please provide a design"],
    },
    pattern: {
      type: String,
      required: [true, "Please provide a pattern"],
    },
    url: {
      type: String,
      required: [true, "Please provide a url"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apparel", ApparelSchema);
