import Joi = require("joi");

export const registerUserValidation = Joi.object().keys({
    userName: Joi.string().max(50).alphanum().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

export const signInValidator = Joi.object().keys({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});