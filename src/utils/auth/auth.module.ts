import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  providers: [AuthService]
})
export class AuthModule {}
