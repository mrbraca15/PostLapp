import { createConnection, Connection } from "typeorm";
import { Enviroment } from "./Enviroment";

export class MySqlConnector {

    static connect(): Promise<Connection> {
        return new Promise((resolve: any, reject: any) => {
            createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: Enviroment.DATABASE_USERNAME,
                password: Enviroment.DATABASE_PASSWORD,
                database: "postlapp",
                entities: [
                    __dirname + "/entities/*"
                ],
                synchronize: false,
            }).then((connection: Connection) => {
                console.log("connection ok");
                resolve(connection);

            }).catch(error => console.log(error));
        });
    };


}