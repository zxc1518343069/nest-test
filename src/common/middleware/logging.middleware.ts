import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// 参考链接 https://docs.nestjs.com/middleware
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('123');
    next();
  }
}

export const log = (req: Request, res: Response, next: NextFunction) => {
  console.log(res);
  next();
};
