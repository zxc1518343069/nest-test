import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Authorization');
    console.log('guards', authHeader, process.env.API_KEY);
    return authHeader === this.configService.get('API_KEY');
    // return authHeader === process.env.API_KEY;
    // return true; // 通过返回值来判断是否让通过
  }
}
