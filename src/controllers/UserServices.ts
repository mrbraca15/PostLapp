import { Request, Response } from "express";
import { User } from '../entities/User';
import { Jwt } from "../utilities/Jwt";
import { UserFacade } from "../facade/UserFacade";
import { ClientMessageException, DataValidationException, SecurityException, UnexpectedException } from "../exceptions/Exeptions";
import { compare } from "bcrypt-nodejs";
import { HttpErrorEnum } from "../enumerations/HttpErrorEnum";

export class UserService {

    private jwt: Jwt;
    private userFacade: UserFacade;

    constructor() {
        this.jwt = new Jwt();
        this.userFacade = new UserFacade();
    }

    async signIn(request: Request, response: Response) {

        try {
            if (!request.body.nickName) throw new DataValidationException("The nickname is required");
            if (!request.body.password) throw new DataValidationException("The password is required");

            const NICK_NAME = request.body.nickName.toLowerCase().trim();
            const PASSWORD = request.body.password;

            let user: User = await this.userFacade.getUserByNickName(NICK_NAME);

            if (!user) throw new SecurityException("User or password incorrect");

            compare(PASSWORD, user.password, (error: Error, result: boolean) => {

                if (!error && result) {
                    response.send({
                        user: {
                            nickName: user.nickName
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

            if (!request.body.nickName) throw new DataValidationException("The nickname is required");
            if (!request.body.password) throw new DataValidationException("The password is required");

            userUp.password = request.body.password;
            userUp.nickName = request.body.nickName.toLowerCase();

            let nickNameUser: User = await this.userFacade.getUserByNickName(userUp.nickName);

            if (nickNameUser) throw new SecurityException("El usuario " + userUp.nickName + " ya está en uso");

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