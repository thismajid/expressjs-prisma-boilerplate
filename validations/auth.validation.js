const Joi = require("joi");
const { password } = require("./custom.validation");

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  login,
  register,
};
