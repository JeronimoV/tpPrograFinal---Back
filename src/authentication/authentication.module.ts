import { MongooseModule } from '@nestjs/mongoose';
import { Users,UsersSchema } from '../users/schema/users.schema';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthModule } from 'src/utils/auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), AuthModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})

export class AuthenticationModule {}
