"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var MySqlConnector = /** @class */ (function () {
    function MySqlConnector() {
    }
    MySqlConnector.connect = function () {
        return new Promise(function (resolve, reject) {
            typeorm_1.createConnection({
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
            }).then(function (connection) {
                console.log("connection ok");
                resolve(connection);
            }).catch(function (error) { return console.log(error); });
        });
    };
    ;
    return MySqlConnector;
}());
exports.MySqlConnector = MySqlConnector;
