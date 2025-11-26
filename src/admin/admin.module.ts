import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UsersModule } from 'src/users/users.module';
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), UsersModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
