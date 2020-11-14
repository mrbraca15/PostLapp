"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entities/User");
var Jwt_1 = require("../utilities/Jwt");
var UserFacade_1 = require("../facade/UserFacade");
var Exeptions_1 = require("../exceptions/Exeptions");
var bcrypt_nodejs_1 = require("bcrypt-nodejs");
var HttpErrorEnum_1 = require("../enumerations/HttpErrorEnum");
var UserSchema_1 = require("../schemas/UserSchema");
var UserService = /** @class */ (function () {
    function UserService() {
        this.jwt = new Jwt_1.Jwt();
        this.userFacade = new UserFacade_1.UserFacade();
    }
    UserService.prototype.signIn = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var NICK_NAME, PASSWORD, user_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!request.body.userName)
                            throw new Exeptions_1.DataValidationException("The nickname is required");
                        if (!request.body.password)
                            throw new Exeptions_1.DataValidationException("The password is required");
                        NICK_NAME = request.body.userName.toLowerCase().trim();
                        PASSWORD = request.body.password;
                        return [4 /*yield*/, this.userFacade.getUserByNickName(NICK_NAME)];
                    case 1:
                        user_1 = _a.sent();
                        if (!user_1)
                            throw new Exeptions_1.SecurityException("User or password incorrect");
                        bcrypt_nodejs_1.compare(PASSWORD, user_1.password, function (error, result) {
                            if (!error && result) {
                                response.send({
                                    user: {
                                        userName: user_1.userName
                                    },
                                    token: _this.jwt.generateToken(user_1)
                                });
                            }
                            else {
                                response.status(HttpErrorEnum_1.HttpErrorEnum.UNAUTHORIZED).send(new Exeptions_1.ClientMessageException("Usuario o contraseña incorrecta"));
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            response.status(500).send(new Exeptions_1.UnexpectedException());
                            throw error_1;
                        }
                        else {
                            response.status((error_1.code) ? error_1.code : 500).send(new Exeptions_1.ClientMessageException(error_1.message));
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.signUp = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userUp, _a, value, error, user, userNameUser, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userUp = new User_1.User();
                        _a = UserSchema_1.registerUserValidation.validate(request.body), value = _a.value, error = _a.error;
                        if (error)
                            throw new Exeptions_1.DataValidationException(error.message);
                        user = value;
                        userUp.password = user.password;
                        userUp.userName = user.userName.toLowerCase();
                        return [4 /*yield*/, this.userFacade.getUserByNickName(userUp.userName)];
                    case 1:
                        userNameUser = _b.sent();
                        if (userNameUser)
                            throw new Exeptions_1.SecurityException("El usuario " + userUp.userName + " ya está en uso");
                        this.userFacade.add(userUp).then(function () {
                            response.send({});
                        }, function (error) {
                            response.status(500).send(new Exeptions_1.ClientMessageException(error.message));
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        if (error_2 instanceof Error) {
                            response.status(500).send(new Exeptions_1.UnexpectedException(error_2.message));
                            throw error_2;
                        }
                        else {
                            response.status((error_2.code) ? error_2.code : 500).send(new Exeptions_1.ClientMessageException(error_2.message));
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
