import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersDTO } from 'src/dtos/users.dto';
import { Users } from 'src/users/schema/users.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Users.name) private userModel : Model<Users>){}

    async getUsers() : Promise<usersDTO[]>{
        try {
            const response = await this.userModel.find().select("_id name surname email userName fechaNacimiento descripcion image admin userEnabled");
            return response as usersDTO[];
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    async deleteUser(id : string){
        try {
            if(id.trim() == ""){
                throw new BadRequestException();
            }
            const response = await this.userModel.updateOne({_id: id}, {userEnabled : false})
            return response;
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    async enableUser(id : string){
        try {
            if(id.trim() == ""){
                throw new BadRequestException();
            }
            const response = await this.userModel.updateOne({_id: id}, {userEnabled : true})
            return response;
        } catch (error) {
            console.log("Error " + error.error);
            throw error;
        }
    }

    
}
