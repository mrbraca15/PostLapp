"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
exports.registerUserValidation = Joi.object().keys({
    userName: Joi.string().max(50).alphanum().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});
