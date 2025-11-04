import { Controller, Get, Post , Body, Param, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../utils/guards/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}

    @Get(":username")
    getUserByUserName(@Param("username") username : any){
            return this.usersService.find(username);
    }

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() data : any){
        return this.usersService.create(data);
    }
}
