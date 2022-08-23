import { IS_PUBLIC } from './../decorators/public.decorators';
import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata

    // 参数 元数据键和用于从中检索元数据的上下文（装饰器目标）。
    const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
    console.log('ctx', context, context.getHandler(), isPublic);
    if (isPublic) return true;
    const authHeader = request.header('Authorization');
    console.log('guards', authHeader, process.env.API_KEY);
    return authHeader === this.configService.get('API_KEY');
    // return authHeader === process.env.API_KEY;
    // return true; // 通过返回值来判断是否让通过
  }
}
