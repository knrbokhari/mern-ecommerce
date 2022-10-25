const Joi = require("joi");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidation = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = loginValidation;
