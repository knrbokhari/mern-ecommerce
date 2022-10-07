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
    orders: [{ _id: "633c9b55621e7c4cefb528b1" }],
  },
];

exports.getUsersServices = () => {
  return users;
};

exports.findUserByEmail = (email) => {
  let user = users.find((user) => user.email === email);
  return user;
};

exports.findUserById = (id) => {
  let user = users.find((user) => user.id === id);
  return user;
};

exports.createUserServices = async (user) => {
  const model = new User(user);
  users.push(model);
  return model;
};

exports.getUserOrderById = (id) => {
  let user = users.find((user) => user.id === id);
  return user.orders;
};

// exports.name  = () => {}
// exports.name  = () => {}
// exports.name  = () => {}
