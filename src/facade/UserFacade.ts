import { User } from "../entities/User";
import { DataValidationException } from "../exceptions/Exeptions";
import { genSalt, hash } from "bcrypt-nodejs";
import { getConnection } from "typeorm";


export class UserFacade {

    constructor() {

    }

    add(user: User): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            if (!user) throw new Error("El usuario es requerido");

            if (!user.nickName) throw new DataValidationException("The nickname is required");
            if (!user.password) throw new DataValidationException("The password is required");

            if (user.password.length < 6) throw new DataValidationException("The password must have minimum 6 characters");
            if (user.nickName.length < 6 || user.nickName.length > 12) throw new DataValidationException("El nick debe contener entre 6 y 12 caracteres");
            // if (!validator.isAlphanumeric(user.nickName)) throw new DataValidationException("Your nickname only must have alphanumeric characters");

            try {
                genSalt(10, (err, salt) => {
                    hash(user.password, salt, null, (err, hash) => {
                        user.password = hash;
                        user.creationDate = new Date();

                        getConnection().manager.save(user).then(() => {
                            resolve();
                        }, (error) => {
                            reject(error);
                        });

                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }


    /**
     * retorna todfos los usuarios que no han sido 
     * verificados
     */
    getUnVerifiedUser(): Promise<User[]> {
        return new Promise((resolve: any, reject: any) => {

            let user: User = new User();

            getConnection().manager.find(User, user).then((users: User[]) => {
                resolve(users);
            }, (error) => {
                reject(error);
            });
        });
    }



    getUserByNickName(nickName: string): Promise<User> {
        return new Promise((resolve: any, reject: any) => {

            try {
                if (!nickName) throw new DataValidationException("The nickName is required");

                let user: User = new User();
                user.nickName = nickName;

                getConnection().manager.findOne(User, user).then((user: User) => {
                    resolve(user);
                }, (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}