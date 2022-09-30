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
const PORT = process.env.PORT || 5000;
const verifyJWT = require("./Middleware/verifyJWT");
require("./Connection");

// import routes
const User = require("./Models/User");
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const ImageRoutes = require("./Routes/ImageRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes middleware
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", ImageRoutes);
app.use("/orders", OrderRoutes);

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

server.listen(PORT, () => {
  console.log("server running at port", PORT);
});

app.set("socketio", io);
