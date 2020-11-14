import { User } from "../entities/User";
import { DataValidationException } from "../exceptions/Exeptions";
import { genSalt, hash } from "bcrypt-nodejs";
import { getConnection } from "typeorm";
import { registerUserValidation } from "../schemas/UserSchema";



export class UserFacade {

    constructor() {

    }

    add(user: User): Promise<any> {
        return new Promise((resolve: any, reject: any) => {


            const { value, error } = registerUserValidation.validate(user);
            if (error) throw new DataValidationException(error.message);
            user = value;

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



    getUserEmail(email: string): Promise<User> {
        return new Promise((resolve: any, reject: any) => {

            try {
                if (!email) throw new DataValidationException("The email is required");

                let user: User = new User();
                user.email = email;

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