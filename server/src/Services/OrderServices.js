const Order = require("../Models/Order");

exports.getAllOrderServices = async () => {
  const orders = await Order.find()
    .populate("owner", ["email", "name"])
    .sort({ _id: -1 });
  return orders;
};

exports.createOrderServices = async (
  userId,
  cart,
  country,
  address,
  totalAmount,
  items,
  transactionId
) => {
  const order = await Order.create({
    owner: userId,
    products: cart,
    country,
    address,
    count: items,
    total: totalAmount,
    transactionId,
  });
  await order.save();
  return order;
};
