import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly authenticationService : AuthenticationService){}

    @Get()
    verificarAutorizacion(@Headers('Authorization') token: string){
        return this.authenticationService.verificarJWT(token)
    }

    @Post()
    loginUser(@Body() data : any){
        return this.authenticationService.login(data);
    }
}
