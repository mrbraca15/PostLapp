"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var Exeptions_1 = require("../exceptions/Exeptions");
var SECRET_KEY = "@T45l4Pp#";
var EXPIRED_ERROR_CODE = 1;
var OTHER_SECURITY_ERROR = -1;
var Jwt = /** @class */ (function () {
    function Jwt() {
    }
    Jwt.prototype.generateToken = function (user) {
        try {
            if (!user)
                throw new Error("Usuario Invalido");
            var obj = { id: user.id, nickName: user.userName, email: user.email };
            var token = jsonwebtoken_1.sign(obj, SECRET_KEY, { expiresIn: "1h" });
            return token;
        }
        catch (e) {
            throw e;
        }
    };
    Jwt.prototype.validateToken = function (request, response) {
        return new Promise(function (resolve, reject) {
            try {
                var token = void 0;
                if (typeof request == "string") {
                    token = request;
                }
                else {
                    token = request.header("Authorization");
                }
                var obj = jsonwebtoken_1.verify(token, SECRET_KEY);
                resolve(obj);
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    response.status(401).send(new Exeptions_1.ClientMessageException("Your session has expired.", EXPIRED_ERROR_CODE));
                }
                else {
                    response.status(403).send(new Exeptions_1.ClientMessageException("You need sign up to access to this content", OTHER_SECURITY_ERROR));
                }
            }
        });
    };
    /**
     *
     * @param request retorna el usuario por el token
     */
    Jwt.prototype.getUserByToken = function (request) {
        try {
            var token = void 0;
            if (typeof request == "string") {
                token = request;
            }
            else {
                token = request.header("Authorization");
            }
            var obj = jsonwebtoken_1.verify(token, SECRET_KEY);
            return obj;
        }
        catch (error) {
            return null;
        }
    };
    return Jwt;
}());
exports.Jwt = Jwt;
