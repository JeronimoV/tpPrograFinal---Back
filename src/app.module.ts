import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';
import { CloudinaryService } from './utils/cloudinary/cloudinary.service';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),MongooseModule.forRoot("mongodb+srv://jeronimo:jero2003@red-social.nspnwlb.mongodb.net/Red-Social?appName=red-social"),UsersModule, AuthenticationModule, PostsModule, CloudinaryModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {
  
}
