import { Request, Response } from "express";
import { User } from '../entities/User';
import { Jwt } from "../utilities/Jwt";
import { UserFacade } from "../facade/UserFacade";
import { ClientMessageException, DataValidationException, SecurityException, UnexpectedException } from "../exceptions/Exeptions";
import { compare } from "bcrypt-nodejs";
import { HttpErrorEnum } from "../enumerations/HttpErrorEnum";
import { registerUserValidation, signInValidator } from "../schemas/UserSchema";

export class UserService {

    private jwt: Jwt;
    private userFacade: UserFacade;

    constructor() {
        this.jwt = new Jwt();
        this.userFacade = new UserFacade();
    }

    async signIn(request: Request, response: Response) {

        try {
            const { value, error } = signInValidator.validate(request.body);
            if (error) throw new DataValidationException(error.message);

            const EMAIL =value.email.toLowerCase().trim();
            const PASSWORD =value.password;

            let user: User = await this.userFacade.getUserEmail(EMAIL);

            if (!user) throw new SecurityException("Usuario o contraseña incorrecta");

            compare(PASSWORD, user.password, (error: Error, result: boolean) => {
                if (!error && result) {
                    response.send({
                        user: {
                            userName: user.userName
                        },
                        token: this.jwt.generateToken(user)
                    })

                } else {
                    response.status(HttpErrorEnum.UNAUTHORIZED).send(new ClientMessageException("Usuario o contraseña incorrecta"));
                }

            });
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send(new UnexpectedException());
                throw error;
            } else {
                response.status((error.code) ? error.code : 500).send(new ClientMessageException(error.message));
            }
        }
    }

    async signUp(request: Request, response: Response) {

        try {
            const userUp: User = new User();
            const { value, error } = registerUserValidation.validate(request.body);
            if (error) throw new DataValidationException(error.message);
            let user: User = value;

            userUp.password = user.password;
            userUp.userName = user.userName.toLowerCase();
            userUp.email = user.email;
            let userNameUser: User = await this.userFacade.getUserEmail(userUp.email);

            if (userNameUser) throw new SecurityException("El usuario " + userUp.email + " ya está en uso");

            this.userFacade.add(userUp).then(() => {
                response.send({});
            }, (error: Error) => {
                response.status(500).send(new ClientMessageException(error.message));
            });

        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send(new UnexpectedException(error.message));
                throw error;
            } else {
                response.status((error.code) ? error.code : 500).send(new ClientMessageException(error.message));
            }
        }
    }



}