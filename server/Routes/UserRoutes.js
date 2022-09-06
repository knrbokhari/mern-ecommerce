const {
  signup,
  login,
  getUser,
  getUserOrders,
} = require("../Controllers/UserControllers");
const verifyJWT = require("../Middleware/verifyJWT");

const router = require("express").Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// get users
router.get("/", getUser);

// get user orders
router.get("/:id/orders", verifyJWT, getUserOrders);

module.exports = router;
