import { BadRequestException, ConflictException, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Users } from '../users/schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

    constructor(@InjectModel(Users.name) private userModel : Model<Users>, private jwt : JwtService){}

    async verifyRegister(data : any){ //Este metodo es usado por userService, no es utilizado aqui, ya que la creacion de usuarios es delegado a ese otro modulo
        try {
            if(data.name.trim() == "" || data.surname.trim() == "" || data.password.trim() == "" || data.email.trim() == "" || data.userName.trim() == "" || data.descripcion.trim() == ""){
                throw new BadRequestException("Faltan datos necesarios")
            }
            const response = await this.verificarExistenciaUsuario(data);
            if(response[0]){
                throw new ConflictException("El " + response[1]+ " ya esta en uso!")
            }
            return true;
        } catch (error) {
            return error;
        }
    }

    async login(data : any){
        console.log(data);
        
        try {
            if(data.password.trim() == "" || data.email.trim() == ""){
                throw new BadRequestException("Faltan datos necesarios")
            }

            const userFound = await this.userModel.findOne({email: data.email.trim()});

            if(userFound == null){
                throw new NotFoundException("El usuario con el email " + data.email + " no fue encontrado");
            }

            const password = data.password;
            console.log(data);
            
            const comparationResult = await bcrypt.compare(password, userFound.password)
            if(comparationResult){
                const token = await this.jwt.signAsync({id: userFound.id, userName: userFound.userName});
                return {
                    _id: userFound._id,
                    name : userFound.name,
                    surname: userFound.surname,
                    email: userFound.email,
                    userName: userFound.userName,
                    fechaNacimiento : userFound.fechaNacimiento,
                    descripcion: userFound.descripcion,
                    image: userFound.image,
                    token: token,
                    admin: userFound.admin
                }
            }else{
                throw new UnauthorizedException("La contraseña no es correcta")
            }
        } catch (error) {
            console.log("Error " + error);
            throw error;
        }
    }

    private async verificarExistenciaUsuario(data : any){
        const userNameFound = await this.userModel.findOne({userName: data.userName});
        const emailFound = await this.userModel.findOne({email: data.email});

        if(userNameFound != null || emailFound != null){
            if(userNameFound != null){
                return [true, "username"];
            }else{
                return [true, "email"];
            }
        }else{
            return [false];
        }
    }

    async verificarJWT(token : string){
        if(!token){
          throw new UnauthorizedException()
        }
        try {

            const spliterHeader = token.split(" ");

            console.log(spliterHeader[1]);
            

          const payload = await this.jwt.verifyAsync(spliterHeader[1], {
            secret: "alaverga"
          })
          return payload;
        } catch (error) {
          console.log(error);
          
          
          throw error;
        }
    }


}
