const User = require("../Models/User");
const Order = require("../Models/Order");
const {
  getAllOrderServices,
  createOrderServices,
} = require("../Services/OrderServices");
const { findUserById } = require("../Services/UserServices");
const {
  reduceProductQuantityAfterOrderServices,
} = require("../Services/ProductServices");
const { NotFound } = require("../utils/error");
const { updateCartOnOrderServices } = require("../Services/CartServices");

// create order
exports.createOrder = async (req, res) => {
  const io = req.app.get("socketio");
  const { userId, cart, country, address, totalAmount, items, transactionId } =
    req.body;
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw new NotFound("User not found");
    }

    const order = await createOrderServices(
      user._id,
      cart,
      country,
      address,
      totalAmount,
      items,
      transactionId
    );

    cart.map(async (i) => {
      await reduceProductQuantityAfterOrderServices(
        i.cartId.product._id,
        i.cartId.quantity
      );
      await updateCartOnOrderServices(i.cartId._id);
    });

    user.cart = [];
    user.orders.push(order.id);
    const notification = {
      status: "unread",
      message: `New order from ${user.name}`,
      time: new Date(),
    };
    io.sockets.emit("new-order", notification);
    user.markModified("orders");
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// get all order
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await getAllOrderServices();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// shipping order
exports.shippingOrder = async (req, res) => {
  const io = req.app.get("socketio");
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: "shipped" });
    const orders = await Order.find().populate("owner", ["email", "name"]);
    const notification = {
      status: "unread",
      message: `Order ${id} shipped with success`,
      time: new Date(),
    };
    io.sockets.emit("notification", notification, ownerId);
    user.notifications.push(notification);
    await user.save();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// exports.createOrder = async (req, res) => {};
