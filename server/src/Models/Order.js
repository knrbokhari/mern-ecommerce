const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
  {
    products: {
      type: Array,
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "processing",
    },
    total: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: new Date().toISOString().split("T")[0],
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    transactionId: {
      type: String,
      require: true,
    },
  },
  { minimize: false },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
