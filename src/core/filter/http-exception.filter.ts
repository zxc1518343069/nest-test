import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

//​@Catch​​装饰器可以采用单个参数或逗号分隔的列表，如果需要，允许一次为多种类型的异常设置过滤器
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    const exceptionRes = exception.getResponse();
    // console.log(exceptionRes); // 打印错误信息
    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: null,
      message: message,
      code: -1,
      time: new Date().toDateString(),
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status).json(errorResponse);
  }
}
