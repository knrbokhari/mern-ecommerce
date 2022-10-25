const {
  signup,
  login,
  getUserOrders,
  updateUserNotifications,
  getUsers,
  getUser,
  adminLogin,
  dashboard,
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

// get user
router.get("/:id", verifyJWT, getUser);

// get dashboard data
router.get("/dashboard/data", verifyJWT, verifyAdmin, dashboard);

// get user orders
router.get("/:id/orders", verifyJWT, getUserOrders);

// update user notifcations
router.post("/:id/updateNotifications", verifyJWT, updateUserNotifications);

const configureUserRoutes = (app) => {
  app.use("/users", router);
};

// module.exports = router;
module.exports = configureUserRoutes;
