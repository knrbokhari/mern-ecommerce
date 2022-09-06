const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");
const { createOrder } = require("../Controllers/OrderControllers");

const router = require("express").Router();

// create order
router.post("/", verifyJWT, createOrder);

module.exports = router;
