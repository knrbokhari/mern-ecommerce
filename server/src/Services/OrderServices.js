const Order = require("../Models/Order");

exports.getAllOrderServices = async () => {
  const orders = await Order.find().populate("owner", ["email", "name"]);
  return orders;
};
