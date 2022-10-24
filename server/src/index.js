const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://localhost:3000/",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
const verifyJWT = require("./Middleware/verifyJWT");

// import routes
const User = require("./Models/User");
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const ImageRoutes = require("./Routes/ImageRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const { processRequest } = require("./Middleware/processRequest");
const { errorLogger, infoLogger } = require("./logger");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(infoLogger());

// routes middleware
app.use(processRequest);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", ImageRoutes);
app.use("/orders", OrderRoutes);
app.use("/cart", CartRoutes);

// creating payment with stripe
app.post("/create-payment", verifyJWT, async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

// error
app.get("/error", async (req, res, next) => {
  return next(
    new Error("This is an error and it should be logged to the console")
  );
});

app.set("socketio", io);

app.use(errorLogger());

module.exports = { app, server };
