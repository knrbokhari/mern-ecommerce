const registerValidation = require("./RegisterValidation");
const loginValidation = require("./LoginValidation");
const productValidation = require("./ProductValidation");

const validators = {
  registerValidation,
  loginValidation,
  productValidation,
};

module.exports = validators;
