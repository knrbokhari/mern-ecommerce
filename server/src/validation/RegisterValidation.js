const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().min(3).email().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerValidation = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = registerValidation;
