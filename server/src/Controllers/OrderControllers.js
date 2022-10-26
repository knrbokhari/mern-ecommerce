const User = require("../Models/User");
const moment = require("moment");
const Order = require("../Models/Order");
const {
  getAllOrderServices,
  createOrderServices,
  barChartOrderServices,
  getOrderServices,
  updateOrderStatusServices,
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
    const user = await findUserById(ownerId);
    if (!user) throw new NotFound("User not found");

    const order = await getOrderServices(id);
    if (!order) throw new NotFound("order not found");

    await updateOrderStatusServices(id, ownerId);

    const notification = {
      status: "unread",
      message: `Order ${id} shipped with success`,
      time: new Date(),
    };
    io.sockets.emit("notification", notification, ownerId);
    user.notifications.push(notification);
    await user.save();
    const orders = await getAllOrderServices();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// last seven days orders data
exports.barChartForOrder = async (req, res) => {
  try {
    let lastSevenDays = 7;
    let sevenDaysOrderdata = [];

    const orderData = await barChartOrderServices(lastSevenDays);

    for (let i = 0; i < lastSevenDays; i++) {
      let newDate = new Date().getTime() - i * 24 * 60 * 60 * 1000;

      const fundOrder = orderData.find(
        (d) =>
          d._id.toISOString().split("T", 1)[0] ===
          new Date(newDate).toISOString().split("T", 1)[0]
      );

      if (!fundOrder) {
        let data = {
          name: moment(new Date(newDate)).format("dddd"),
          totalOrder: 0,
          // pv: 0,
        };
        sevenDaysOrderdata.push(data);
      } else {
        let data = {
          name: moment(fundOrder._id).format("dddd"),
          totalOrder: fundOrder.totalOrder,
          // pv: fundOrder.totalProductCost,
        };
        sevenDaysOrderdata.push(data);
      }
    }

    res.status(200).json(sevenDaysOrderdata);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
