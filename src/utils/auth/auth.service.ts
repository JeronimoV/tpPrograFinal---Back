import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwt : JwtService){}

    generateToken(id : any, username : string){
        const payload = {id: id, username};
        const token = this.jwt.sign(payload);

        return token;
    }

    verifyToken(token : string){
        try {
            return this.jwt.verify(token)
        } catch (error) {
            throw error;
        }
    }
}
