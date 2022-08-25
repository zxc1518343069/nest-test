import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { LoggingMiddleware, log } from './common/middleware/logging.middleware';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 校验相关 参考https://docs.nestjs.com/techniques/validation#stripping-properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 排除除了entity的参数
      // forbidNonWhitelisted:true, // 出现其他参数外报错
      transform: true, // 把请求参数 转换成entity 实例
      // 或者把参数转换成想要的类型 比如 id string body设置的number 则转换成number
      // 对 性能有轻微影响
      transformOptions: {
        // https://github.com/typestack/class-transformer 参考
        enableImplicitConversion: true, // 启用隐式类型转换
      },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new ApiKeyGuard());

  await app.listen(3000);
}
bootstrap();
