import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwt : JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req);
    
    const token = this.extractTokenFromHeader(req);
    
    if(!token){
      throw new UnauthorizedException()
    }
    try {
      const payload = this.jwt.verifyAsync(token, {
        secret: "alaverga"
      })
      req["user"] = payload;
      return true
    } catch (error) {
      console.log(error);
      
      return false
    }

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
