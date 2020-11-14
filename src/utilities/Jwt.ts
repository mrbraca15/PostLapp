import { sign, verify, TokenExpiredError } from "jsonwebtoken";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { ClientMessageException } from "../exceptions/Exeptions";

const SECRET_KEY: string = "@T45l4Pp#";
const EXPIRED_ERROR_CODE: number = 1;


const OTHER_SECURITY_ERROR: number = -1;

export class Jwt {



    constructor() {

    }

    generateToken(user: User): string {

        try {
            if (!user) throw new Error("Usuario Invalido");

            let obj = { id: user.id, nickName: user.userName, email: user.email };

            let token: string = sign(
                obj,
                SECRET_KEY,
                { expiresIn: "1h" },
            );

            return token;
        } catch (e) {
            throw e;
        }

    }




    validateToken(request: Request | string, response: Response): Promise<User> {
        return new Promise((resolve: any, reject: any) => {
            try {
                let token: string;

                if (typeof request == "string") {
                    token = request;
                } else {
                    token = request.header("Authorization");
                }

                let obj: any = verify(token, SECRET_KEY);
                resolve(obj);

            } catch (error) {
                if (error instanceof TokenExpiredError) {
                    response.status(401).send(new ClientMessageException("Your session has expired.", EXPIRED_ERROR_CODE));

                } else {
                    response.status(403).send(new ClientMessageException("You need sign up to access to this content", OTHER_SECURITY_ERROR));
                }
            }
        });
    }


    /**
     * 
     * @param request retorna el usuario por el token
     */
    getUserByToken(request: Request): User {
        try {
            let token: string;

            if (typeof request == "string") {
                token = request;
            } else {
                token = request.header("Authorization");
            }

            let obj: any = verify(token, SECRET_KEY);

            return obj;

        } catch (error) {
            return null;
        }
    }
}