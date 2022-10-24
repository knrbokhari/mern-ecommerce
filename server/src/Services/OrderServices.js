const Order = require("../Models/Order");

exports.getAllOrderServices = async () => {
  const orders = await Order.find()
    .populate("owner", ["email", "name"])
    .sort({ _id: -1 });
  return orders;
};

exports.getOrderServices = async (id) => {
  const order = await Order.findById(id);
  return order;
};

exports.updateOrderStatusServices = async (id, ownerId) => {
  const order = await Order.findByIdAndUpdate(
    { _id: id, owner: ownerId },
    { status: "shipped" }
  );
  return order;
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

exports.barChartOrderServices = async (query) => {
  const oldDate = new Date().getTime() - query * 24 * 60 * 60 * 1000;
  const day = new Date(oldDate);

  const orderData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(day),
        },
      },
    },
    {
      $group: {
        _id: "$createdAt",
        totalOrder: { $sum: "$count" },
        totalProductCost: { $sum: "$total" },
      },
    },
  ]).sort({ _id: -1 });

  return orderData;
};

exports.totalEarnings = async () => {
  const earning = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: "$total" },
      },
    },
  ]);

  return earning[0].totalEarnings;
};
