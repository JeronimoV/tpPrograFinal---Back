import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private commentService : CommentsService){}

    @Get(":data")
    getComments(@Param("data") data : any){
        let argumentsArray = data.split("--");
        console.log(data);
        

        return this.commentService.get(argumentsArray[0], argumentsArray[1]);
    }

    @Post()
    createComment(@Body() data : any){
        return this.commentService.create(data);
    }

    @Post("/edit")
    editComment(@Body() data : any){
        return this.commentService.edit(data);
    }

    @Post("/commentDate")
    getCommentDate(@Body() data : any){
        return this.commentService.getCommentsFromDate(data);
    }

    @Post("/commentFromPost")
    getCommentPosts(@Body() data : any){
        return this.commentService.getCommentsFromPosts(data);
    }
}
