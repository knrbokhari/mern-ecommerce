const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    // jwt token
    const token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1d" }
    );

    const userWithToken = Object.assign({}, user?._doc);
    userWithToken.token = token;

    res.status(200).json(userWithToken);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send("Email already exists");
    res.status(400).send(e.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    // jwt token
    const token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1d" }
    );
    const userWithToken = Object.assign({}, user?._doc);
    userWithToken.token = token;

    res.status(200).json(userWithToken);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.status(200).json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
//  exports.signup = async (req, res) => {}
