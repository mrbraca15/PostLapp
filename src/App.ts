import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import { MySqlConnector } from './MySqlConnector';
import { userRoutes } from "./routes/UserRoutes";

export const PORT: string = "9999";

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.listen(PORT, () => {

});

app.get('/', (request, response) => {
    response.send('PostLapp - Service Up');
});


export let mySqlConnectorStatus = MySqlConnector.connect().then(() => {

});