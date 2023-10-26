const Joi = require("joi");

const registerUserValidation = Joi.object({
    name: Joi.string().required().min(3).max(100),
    username: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required().max(200),
    password: Joi.string().required().min(8).max(200),
});

const loginUserValidation = Joi.object({
    username: Joi.string().required().max(100),
    password: Joi.string().required().max(200),
});

const getUserValidation = Joi.string().required().max(200);

module.exports = {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
};
