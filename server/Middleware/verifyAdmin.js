const User = require("../Models/User");

const verifyAdmin = async (req, res, next) => {
  const requester = req.user;
  const requesterAccount = await User.findById(requester);

  if (requesterAccount.isAdmin === true) {
    next();
  } else {
    res.status(403).send({ message: "You don't have permission" });
  }
};

module.exports = verifyAdmin;
