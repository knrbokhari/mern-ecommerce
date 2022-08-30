const { signup, login, getUser } = require("../Controllers/UserControllers");

const router = require("express").Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// get users
router.get("/", getUser);

module.exports = router;
