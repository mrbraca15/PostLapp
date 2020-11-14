import { createConnection, Connection } from "typeorm";

export class MySqlConnector {

    static connect(): Promise<Connection> {
        return new Promise((resolve: any, reject: any) => {
            createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                //    password: "admin",
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