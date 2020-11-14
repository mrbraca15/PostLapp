"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserServices_1 = require("../controllers/UserServices");
exports.userRoutes = express_1.Router();
var userService = new UserServices_1.UserService();
exports.userRoutes.post('/signUp', function (request, response) {
    userService.signUp(request, response);
});
exports.userRoutes.post('/signIn', function (request, response) {
    userService.signIn(request, response);
});
exports.userRoutes.get('/hola', function (request, response) {
    response.send("ok");
});
