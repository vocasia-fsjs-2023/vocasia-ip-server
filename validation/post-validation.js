const Joi = require("joi");

const createPostValidation = Joi.object({
    title: Joi.string().required().max(255),
    content: Joi.string().required(),
});

const updatePostValidation = Joi.object({
    id: Joi.number().positive().required(),
    title: Joi.string().max(255).required(),
    content: Joi.string().required(),
    published: Joi.boolean().required(),
});

const getPostValidation = Joi.number().positive().required();

module.exports = {
    createPostValidation,
    getPostValidation,
    updatePostValidation,
};
