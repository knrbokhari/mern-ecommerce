const User = require("../../Models/User");

let users = [
  {
    id: "1",
    name: "test001",
    email: "test@test.com",
    password: "",
    isAdmin: false,
    cart: [],
    notifications: [],
    orders: [],
  },
];

exports.getUsersServices = () => {
  return users;
};
