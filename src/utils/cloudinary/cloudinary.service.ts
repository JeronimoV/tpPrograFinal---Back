import { Injectable } from '@nestjs/common';
import { cloudinary } from './cloudinary.config';

@Injectable()
export class CloudinaryService {
    async uploadImage(file : Express.Multer.File){
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "app",
                        transformation: [
                            {width: 300, height: 300, crop: "fill"},
                            {quality: "auto"},
                        ]
                    },
                    (error, result) => {
                        if(error) return reject(error);
                        if(result) resolve(result)
                    },
                ).end(file.buffer)
            })
    }
}
