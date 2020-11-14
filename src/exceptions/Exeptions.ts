import { HttpErrorEnum } from "../enumerations/HttpErrorEnum";

export class ClientMessageException {

    errorMessage: string;
    errorCode: number;

    constructor(message: string, errorCode?: number) {
        this.errorMessage = message;
        this.errorCode = errorCode;
        Error.apply(this, arguments);
    }
}

export class DataValidationException {
    message: string;
    code: number;

    constructor(message: string) {
        this.message = message;
        this.code = HttpErrorEnum.BAD_REQUEST;
        Error.apply(this, arguments);
    }
}

export class SecurityException {
    message: string;
    code: number;

    constructor(message?: string) {

        if (message) {
            this.message = message;
        } else {
            this.message = "No Authorized";
        }

        this.code = 401;
        Error.apply(this, arguments);
    }
}

export class UnexpectedException {

    errorMessage: string;

    constructor(errorMessage?: string) {
        if (errorMessage) {
            this.errorMessage = errorMessage;
        } else {
            this.errorMessage = "An error has occurred, try again later";
        }

        Error.apply(this, arguments);
    }
}