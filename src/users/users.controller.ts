import { Controller, Get, Post , Body, Param, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}

    @Get(":username")
    getUserByUserName(@Param("username") username : any){
            return this.usersService.find(username);
    }

    @Get("id/:id")
    getUserById(@Param("id") id : any){
        return this.usersService.findId(id)
    }

    @Post()
    createUser(@Body() data : any){
        return this.usersService.create(data);
    }

    @Post("like")
    likePost(@Body() data : any){
        return this.usersService.saveLike(data);
    }

    @Post("dislike")
    noLikePost(@Body() data : any){
        return this.usersService.removeLike(data);
    }

    @Get("getLikes/:userId")
    getUserLikes(@Param("userId") data : any){
        return this.usersService.getLikes(data);
    }
}
