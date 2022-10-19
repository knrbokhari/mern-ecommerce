const {
  signup,
  login,
  getUserOrders,
  updateUserNotifications,
  getUsers,
  getUser,
  adminLogin,
} = require("../Controllers/UserControllers");
const verifyAdmin = require("../Middleware/verifyAdmin");
const verifyJWT = require("../Middleware/verifyJWT");

const router = require("express").Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// admin login from super system
router.post("/admin_login", adminLogin);

// get users
router.get("/", verifyJWT, verifyAdmin, getUsers);

router.get("/:id", verifyJWT, getUser);

// get user orders
router.get("/:id/orders", verifyJWT, getUserOrders);

// update user notifcations
router.post("/:id/updateNotifications", verifyJWT, updateUserNotifications);

module.exports = router;
