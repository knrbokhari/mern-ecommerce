const { signup, login } = require("../Controllers/UserControllers");

const router = require("express").Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

module.exports = router;
