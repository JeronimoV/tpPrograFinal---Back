import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticationService } from 'src/authentication/authentication.service';
import * as bcrypt from "bcrypt"
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private userModel : Model<Users>, private authService : AuthenticationService, private postService : PostsService){}

    async create(data : any){
        try {
            const response = await this.authService.verifyRegister(data);
            if(response != true){
                throw response;
            }
            const dataCopy = {...data};
            data.likes = [];
            data.password = await bcrypt.hash(data.password, 8);
            data.admin = data.admin.toLowerCase() == "true";
            const newUSer = new this.userModel(data);
            console.log(newUSer);
            
            await newUSer.save();
            const result = await this.authService.login(dataCopy);
            return result;
        } catch (error) {
            console.log("Error " + error);
            throw error;
        }
    }

    async find(data : any){
        try {
            const userFound = await this.userModel.findOne({userName: data})
            if(userFound == null){
                throw new NotFoundException("Usuario no encontrado. Verifique los datos de busqueda")
            }
            return userFound
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    async findId(id : any){
        try {
            const userFound = await this.userModel.findOne({_id: id})
            if(userFound == null){
                throw new NotFoundException("Usuario no encontrado. Verifique los datos de busqueda")
            }
            return userFound
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    async saveLike(data: any){
        try {
            const response = await this.userModel.updateOne({_id: data.userId}, {$addToSet: {likes: data.postId}})
            await this.postService.incrementLike({postId: data.postId, likes: data.likes});
            return response;
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    async removeLike(data : any){
       try {
            const response = await this.userModel.updateOne({_id: data.userId}, {$pull: {likes: data.postId}})
            await this.postService.decrementLike({postId: data.postId , likes: data.likes});
            return response;
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    async getLikes(userId: string){
        try {
            console.log(userId);
            
            const response = await this.userModel.findById(userId).select("likes");
            console.log(response);
            
            return response;
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }
}
