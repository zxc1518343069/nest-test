import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DataBaseModule } from './data-base/data-base.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './config/appConfig';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    // 这样写不依赖顺序， 如果使用forRoot 则依赖config 的顺序 跟provider 差不多
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true, // 每次启动的时候自动创建数据库 会导致数据丢失
        autoLoadEntities: true, // 自动加载
      }),
    }),
    //    https://docs.nestjs.com/techniques/configuration#expandable-variables
    ConfigModule.forRoot({
      // 通过Joi 校验环境变量，防止出现env 环境数据错误
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(3306),
        DATABASE_USER: Joi.required(),
      }),
      load: [appConfig],
    }),
    //默认解析 .env 并把键值对与 process.env 相结合 注意顺序要在 configModel 之下
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   port: +process.env.DATABASE_PORT,
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   synchronize: true, // 每次启动的时候自动创建数据库 会导致数据丢失
    //   autoLoadEntities: true, // 自动加载
    // }),
    CatsModule,
    CoffeesModule,
    CoffeeRatingModule,
    DataBaseModule,
  ],
  controllers: [],
  providers: [
    // { // 另一种用法
    //   provide: APP_PIPE,
    //   useFactory: () =>
    //     new ValidationPipe({
    //       whitelist: true, // 排除除了entity的参数
    //       // forbidNonWhitelisted:true, // 出现其他参数外报错
    //       transform: true, // 把请求参数 转换成entity 实例
    //       // 或者把参数转换成想要的类型 比如 id string body设置的number 则转换成number
    //       // 对 性能有轻微影响
    //       transformOptions: {
    //         // https://github.com/typestack/class-transformer 参考
    //         enableImplicitConversion: true, // 启用隐式类型转换
    //       },
    //     }),
    // },
  ],
})
export class AppModule {}
