const {
  signup,
  login,
  getUser,
  getUserOrders,
  updateUserNotifications,
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

// update user notifcations
router.post("/:id/updateNotifications", verifyJWT, updateUserNotifications);

module.exports = router;
