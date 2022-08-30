const { signup } = require("../Controllers/UserControllers");

const router = require("express").Router();

router.post('/signup', signup)

module.exports = router;
