import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticationService } from 'src/authentication/authentication.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private userModel : Model<Users>, private authService : AuthenticationService){}

    async create(data : any){
        try {
            const response = await this.authService.verifyRegister(data);
            if(response != true){
                throw response;
            }
            const dataCopy = {...data};
            data.password = await bcrypt.hash(data.password, 8);
            const newUSer = new this.userModel(data);
            await newUSer.save();
            return this.authService.login(dataCopy);
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
}
