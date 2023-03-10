const User = require("../models/User");
const admin = require("../firebase/firebase-config");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("No auth header");
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  const decodeValue = await admin.auth().verifyIdToken(token);
  try {
    // attach the user to the job routes
    let user = await User.findOne({ mobileNumber: decodeValue.phone_number });
    if (!user) {
      // if user is not found
      user = await User.create({ mobileNumber: decodeValue.phone_number });
    }
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
