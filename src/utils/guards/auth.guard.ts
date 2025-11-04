import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwt : AuthService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    
    if(!token){
      throw new UnauthorizedException()
    }
    try {
      const payload = this.jwt.verifyToken(token)
      req["user"] = payload;
      return true
    } catch (error) {
      console.log(error);
      
      return false
    }

  }
}
