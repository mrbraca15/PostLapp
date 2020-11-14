export class Enviroment {
    static PORT: string = process.env.PORT;
    static HOST_NAME: string = process.env.HOST_NAME;
    static SERVER_SIDE_RENDER_HOST_NAME: string = process.env.SERVER_SIDE_RENDER_HOST_NAME;
    static IS_PROD_MODE: boolean = (process.env.IS_PROD_MODE == "true") ? true : false;
    static BUCKET_NAME: string = process.env.BUCKET_NAME;
    static SECRET_KEY: string = process.env.SECRET_KEY;
    static ACCES_KEY: string = process.env.ACCES_KEY;
    static DATABASE_HOST: string = process.env.DATABASE_HOST;
    static DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT);
    static DATABASE_USERNAME: string = process.env.DATABASE_USERNAME;
    static DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD;
    static DATABASE_NAME: string = process.env.DATABASE_NAME;
}