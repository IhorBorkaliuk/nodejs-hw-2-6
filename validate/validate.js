const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(10).required(),
  email: Joi.string().email({}).required(),
});

module.exports = schema;
