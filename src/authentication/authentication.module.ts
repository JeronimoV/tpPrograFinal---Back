import { MongooseModule } from '@nestjs/mongoose';
import { Users,UsersSchema } from '../users/schema/users.schema';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), JwtModule.register({
      global: true,
      secret: "alaverga"
    }),],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})

export class AuthenticationModule {}
