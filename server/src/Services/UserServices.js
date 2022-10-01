const User = require("../Models/User");

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

exports.createUserServices = async (user) => {
  const savedUser = await User.create(user);
  return savedUser;
};
