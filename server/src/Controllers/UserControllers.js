const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { BadRequest, NotFound } = require("../utils/error");
const {
  findUserByEmail,
  createUserServices,
  getUsersServices,
  getUserOrderById,
  findUserById,
} = require("../Services/UserServices");

dotenv.config();

// signup route
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isUser = await findUserByEmail(email);
    if (isUser) {
      throw new BadRequest("Email already Exits");
    }
    // creating user
    const user = await createUserServices({ name, email, password });

    // jwt token
    const token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1d" }
    );

    // git token to user
    const userWithToken = Object.assign({}, user?._doc);
    userWithToken.token = token;

    res.status(200).json(userWithToken);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// login route
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // finding users by checking email & password
    const user = await User.findByCredentials(email, password);

    // jwt token
    const token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1d" }
    );

    // git token to user
    const userWithToken = Object.assign({}, user?._doc);
    userWithToken.token = token;

    res.status(200).json(userWithToken);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get users
exports.getUsers = async (req, res) => {
  try {
    const users = await getUsersServices();
    if (!users) {
      throw new NotFound("User not found");
    }
    res.status(200).json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.getUserOrders = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await findUserById(id);
    if (!user) {
      throw new NotFound("User not Exits");
    }
    const orders = await getUserOrderById(id);
    User.findById(id).populate("orders");
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.updateUserNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.notifications.forEach((notif) => {
      notif.status = "read";
    });
    user.markModified("notifications");
    await user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
};
//  exports.signup = async (req, res) => {}
//  exports.signup = async (req, res) => {}
