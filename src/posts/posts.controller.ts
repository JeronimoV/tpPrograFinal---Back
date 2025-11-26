import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postService : PostsService){}

    @Post()
    cretaePost(@Body() data : any){
        return this.postService.create(data);
    }

    @Get()
    getPosts(){
        return this.postService.get();
    }

    @Get(":id")
    getUserPosts(@Param("id") id : any){
        return this.postService.getUserPosts(id);
    }

    @Delete(":id")
    deletePost(@Param("id") id : any){
        return this.postService.delete(id)
    }

    @Post("/postDate")
    getPostDate(@Body() data : any){
        return this.postService.getPostsFromDate(data);
    }
}
