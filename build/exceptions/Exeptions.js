"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpErrorEnum_1 = require("../enumerations/HttpErrorEnum");
var ClientMessageException = /** @class */ (function () {
    function ClientMessageException(message, errorCode) {
        this.errorMessage = message;
        this.errorCode = errorCode;
        Error.apply(this, arguments);
    }
    return ClientMessageException;
}());
exports.ClientMessageException = ClientMessageException;
var DataValidationException = /** @class */ (function () {
    function DataValidationException(message) {
        this.message = message;
        this.code = HttpErrorEnum_1.HttpErrorEnum.BAD_REQUEST;
        Error.apply(this, arguments);
    }
    return DataValidationException;
}());
exports.DataValidationException = DataValidationException;
var SecurityException = /** @class */ (function () {
    function SecurityException(message) {
        if (message) {
            this.message = message;
        }
        else {
            this.message = "No Authorized";
        }
        this.code = 403;
        Error.apply(this, arguments);
    }
    return SecurityException;
}());
exports.SecurityException = SecurityException;
var UnexpectedException = /** @class */ (function () {
    function UnexpectedException(errorMessage) {
        if (errorMessage) {
            this.errorMessage = errorMessage;
        }
        else {
            this.errorMessage = "An error has occurred, try again later";
        }
        Error.apply(this, arguments);
    }
    return UnexpectedException;
}());
exports.UnexpectedException = UnexpectedException;
