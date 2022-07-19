import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.replace('Bearer ', '');

    // 反射器，获取接口运行通过的身份集合
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return this.authService
      .validToken(token || '')
      .then((res) => {
        // console.log('AuthGuard success', res);
        request.user = res;
        if (!roles) return true;
        return request.user?.role && roles.includes(request.user.role);
      })
      .catch(() => {
        // console.error('AuthGuard error');
        throw new HttpException('未授权或授权过期', HttpStatus.UNAUTHORIZED);
      });
  }
}
