import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {

    constructor(private cloudinaryService : CloudinaryService){}

    @Post()
    @UseInterceptors(FileInterceptor("image")) 
    async uploadImage(@UploadedFile() file: Express.Multer.File){
            const result = await this.cloudinaryService.uploadImage(file);
            return result;
    }
}
