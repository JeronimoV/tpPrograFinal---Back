import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comments.schema';
import { CommentsController } from './comments.controller';

@Module({
  imports:[MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
