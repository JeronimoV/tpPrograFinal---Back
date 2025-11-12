import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post,PostSchema } from './schema/post.schema';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), AuthenticationModule, CloudinaryModule],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule {}
