import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users,UsersSchema } from './schema/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), AuthenticationModule, CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
