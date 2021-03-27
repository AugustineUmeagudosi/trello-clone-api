const Joi = require('@hapi/joi');

function registration(user) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(4).required(),
    });
  
    return schema.validate(user);
}

function login(user) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(4).required(),
    });
  
    return schema.validate(user);
}

module.exports = {
    registration, login
};