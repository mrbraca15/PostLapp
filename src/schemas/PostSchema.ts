import Joi = require("joi");

export const addPostControllerValidator = Joi.object().keys({
    title: Joi.string().min(6).max(100).required(),
    description: Joi.string().max(500).optional(),
    files: Joi.array().min(1).max(1).required(),
    userId: Joi.number().integer().required()
});

export const addPosFacadeValidator = Joi.object().keys({
    title: Joi.string().min(6).max(100).required(),
    description: Joi.string().max(500).optional(),
    image: Joi.string().uri().required(),
    userId: Joi.number().integer().required()
});

export const findMyPosFacadeValidator = Joi.object().keys({
    userId: Joi.number().integer().required()
});

export const getPostByIdFacadeValidation = Joi.object().keys({
    postId: Joi.number().integer().required()
});

export const deletePostFacadeValidation = Joi.object().keys({
    postId: Joi.number().integer().required(),
    userId: Joi.number().integer().required()
});