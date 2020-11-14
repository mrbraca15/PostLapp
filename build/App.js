"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helmet = require("helmet");
var cors = require("cors");
var bodyParser = require("body-parser");
require("reflect-metadata");
var MySqlConnector_1 = require("./MySqlConnector");
var UserRoutes_1 = require("./routes/UserRoutes");
exports.PORT = "9999";
var app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(UserRoutes_1.userRoutes);
app.listen(exports.PORT, function () {
});
app.get('/', function (request, response) {
    response.send('PostLapp - Service Up');
});
exports.mySqlConnectorStatus = MySqlConnector_1.MySqlConnector.connect().then(function () {
});
