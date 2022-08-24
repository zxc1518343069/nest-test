import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, timeout, catchError, throwError } from 'rxjs';

// NestInterceptor​​​接口要求在类中提供​​intercept()​​方法
// ​​intercept()​​​方法应该从​​RxJS​​​库返回一个​​Observable​​
// ​​CallHandler​​​接口实现了​​handle()​​方法，使用该方法在拦截器中调用路由处理程序方法
// 如果没有在拦截方法的实现中调用​​handle()​​方法，路由处理程序不会被执行
// ​​intercept()​​方法有效地包装了请求、响应流，允许在执行最终路由处理程序之前和之后实现自定义逻辑
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000), // 设置请求过期时间
      catchError((err) => {
        // 设置错误信息
        return throwError(() => new Error(err));
      }),
      map((data) => {
        return {
          data,
          code: 200,
          msg: '请求成功',
        };
      }),
    );
  }
}
