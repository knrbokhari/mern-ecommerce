const User = require("../Models/User");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(200).json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send("Email already exists");
    res.status(400).send(e.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
//  exports.signup = async (req, res) => {}
//  exports.signup = async (req, res) => {}
