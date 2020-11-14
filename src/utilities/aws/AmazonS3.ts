import * as S3 from "aws-sdk/clients/s3";
import { Aws } from "./Aws";
import { Enviroment } from "../../Enviroment";

export class AmazonS3 {
    private aws: Aws;
    s3: S3;

    constructor() {
        this.aws = new Aws();
        this.s3 = new S3();
    }

    uploadFile(file: any): Promise<S3.ManagedUpload.SendData> {

        return new Promise((resolve, reject) => {
            let params: S3.PutObjectRequest = {
                Bucket: Enviroment.BUCKET_NAME,
                Key: "images/" + new Date().getTime() + file.originalname,
                ContentType: file.mimetype,
                Body: file.buffer,
                ACL: 'public-read',
                ContentDisposition: "inline ; filename=" + file.originalname + ";"
            };

            this.s3.upload(params, (err, data:S3.ManagedUpload.SendData) => {
                if (!err) {
                    // console.log("se borro el archivo " + params.Key);
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        });
    }
}