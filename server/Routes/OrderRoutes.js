const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");
const {
  createOrder,
  getAllOrder,
  shippingOrder,
} = require("../Controllers/OrderControllers");

const router = require("express").Router();

// create order
router.post("/", createOrder);

// get all order
router.get("/", verifyJWT, verifyAdmin, getAllOrder);

//shipping order
router.patch("/:id/mark-shipped", verifyJWT, verifyAdmin, shippingOrder);

module.exports = router;
