require('dotenv').config();
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
var multer = require('multer');
var upload = multer();

import { MySqlConnector } from './MySqlConnector';
import { userRoutes } from "./routes/UserRoutes";
import { postRoutes } from './routes/PostRoutes';
import { Enviroment } from "./Enviroment";

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.any()); 
app.use(express.static('public'));

app.use(userRoutes);
app.use("/post", postRoutes);

app.listen(Enviroment.PORT, () => {

});

app.get('/', (request, response) => {
    response.send('PostLapp - Service Up');
});


export let mySqlConnectorStatus = MySqlConnector.connect().then(() => {

});