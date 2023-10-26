const Joi = require("joi");

const createCommentValidation = Joi.object({
    postId: Joi.number().positive().required(),
    userId: Joi.number().positive().required(),
    content: Joi.string().required(),
});

const updateCommentValidation = Joi.object({
    id: Joi.number().positive().required(),
    content: Joi.string().required(),
});

const getCommentValidation = Joi.number().positive().required();

module.exports = { createCommentValidation, updateCommentValidation, getCommentValidation };
