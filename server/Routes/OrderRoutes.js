const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");
const { createOrder, getAllOrder } = require("../Controllers/OrderControllers");

const router = require("express").Router();

// create order
router.post("/", verifyJWT, createOrder);

router.get("/", verifyJWT, verifyAdmin, getAllOrder);

module.exports = router;
