const {
  signup,
  login,
  getUserOrders,
  updateUserNotifications,
  getUsers,
} = require("../Controllers/UserControllers");
const verifyJWT = require("../Middleware/verifyJWT");

const router = require("express").Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// get users
router.get("/", getUsers);

// get user orders
router.get("/:id/orders", verifyJWT, getUserOrders);

// update user notifcations
router.post("/:id/updateNotifications", verifyJWT, updateUserNotifications);

module.exports = router;
