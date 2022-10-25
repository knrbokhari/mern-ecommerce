const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().min(6).required(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().required(),
});

const ProductValidation = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = ProductValidation;
