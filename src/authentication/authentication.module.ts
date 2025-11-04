import { MongooseModule } from '@nestjs/mongoose';
import { Users,UsersSchema } from '../users/schema/users.schema';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})

export class AuthenticationModule {}
