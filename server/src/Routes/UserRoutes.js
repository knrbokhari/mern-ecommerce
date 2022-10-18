const {
  signup,
  login,
  getUserOrders,
  updateUserNotifications,
  getUsers,
  getUser,
  adminLogin,
} = require("../Controllers/UserControllers");
const verifyJWT = require("../Middleware/verifyJWT");

const router = require("express").Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// admin login from super system
router.post("/admin_login", adminLogin);

// get users
router.get("/", getUsers);

router.get("/:id", getUser);

// get user orders
router.get("/:id/orders", verifyJWT, getUserOrders);

// update user notifcations
router.post("/:id/updateNotifications", verifyJWT, updateUserNotifications);

module.exports = router;
