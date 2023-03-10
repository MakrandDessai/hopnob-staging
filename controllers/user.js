const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};
const getUser = async (req, res) => {
  const {
    params: { id: mobileNumber },
  } = req;

  const user = await User.findOne({
    mobileNumber: mobileNumber,
  });
  if (!user) {
    throw new NotFoundError(`No user with mobile number ${mobileNumber}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const updateUser = async (req, res) => {
  const {
    body,
    params: { id: mobileNumber },
  } = req;
  const user = await User.findOneAndUpdate(
    { mobileNumber: mobileNumber },
    body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    throw new NotFoundError(`No user with mobile number ${mobileNumber}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const {
    params: { id: mobileNumber },
  } = req;

  const user = await User.findOneAndDelete({
    mobileNumber: mobileNumber,
  });
  if (!user) {
    throw new NotFoundError(`No user with mobile number ${mobileNumber}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUser,
};
