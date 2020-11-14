import { config } from "aws-sdk/global";
import { Enviroment } from "../../Enviroment";

export class Aws {

    constructor() {

        config.update({
            accessKeyId: Enviroment.ACCES_KEY,
            secretAccessKey: Enviroment.SECRET_KEY
        });
    }
}