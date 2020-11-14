"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entities/User");
var Exeptions_1 = require("../exceptions/Exeptions");
var bcrypt_nodejs_1 = require("bcrypt-nodejs");
var typeorm_1 = require("typeorm");
var UserSchema_1 = require("../schemas/UserSchema");
var UserFacade = /** @class */ (function () {
    function UserFacade() {
    }
    UserFacade.prototype.add = function (user) {
        return new Promise(function (resolve, reject) {
            var _a = UserSchema_1.registerUserValidation.validate(user), value = _a.value, error = _a.error;
            if (error)
                throw new Exeptions_1.DataValidationException(error.message);
            user = value;
            try {
                bcrypt_nodejs_1.genSalt(10, function (err, salt) {
                    bcrypt_nodejs_1.hash(user.password, salt, null, function (err, hash) {
                        user.password = hash;
                        user.creationDate = new Date();
                        typeorm_1.getConnection().manager.save(user).then(function () {
                            resolve();
                        }, function (error) {
                            reject(error);
                        });
                    });
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * retorna todfos los usuarios que no han sido
     * verificados
     */
    UserFacade.prototype.getUnVerifiedUser = function () {
        return new Promise(function (resolve, reject) {
            var user = new User_1.User();
            typeorm_1.getConnection().manager.find(User_1.User, user).then(function (users) {
                resolve(users);
            }, function (error) {
                reject(error);
            });
        });
    };
    UserFacade.prototype.getUserByNickName = function (nickName) {
        return new Promise(function (resolve, reject) {
            try {
                if (!nickName)
                    throw new Exeptions_1.DataValidationException("The nickName is required");
                var user = new User_1.User();
                user.userName = nickName;
                typeorm_1.getConnection().manager.findOne(User_1.User, user).then(function (user) {
                    resolve(user);
                }, function (error) {
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return UserFacade;
}());
exports.UserFacade = UserFacade;
