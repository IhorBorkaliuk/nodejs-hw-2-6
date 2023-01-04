const Joi = require("joi");

const schema = Joi.object({
  // id: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({}).required(),
  phone: Joi.string().min(10).max(10).required(),
});

module.exports = schema;
