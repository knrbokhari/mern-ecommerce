const User = require("../Models/User");

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

exports.findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

exports.createUserServices = async (user) => {
  const savedUser = await User.create(user);
  return savedUser;
};

exports.getUsersServices = async () => {
  const users = await User.find({ isAdmin: false })
    .populate("orders")
    .sort({ createdAt: -1 });
  return users;
};

exports.getUserOrderById = async (id) => {
  const users = await User.findById(id)
    .populate("orders")
    .sort({ createdAt: -1 });
  return users.order;
};
