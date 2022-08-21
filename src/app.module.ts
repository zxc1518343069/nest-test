import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DataBaseModule } from './data-base/data-base.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    //    https://docs.nestjs.com/techniques/configuration#expandable-variables
    ConfigModule.forRoot({
      // 通过Joi 校验环境变量，防止出现env 环境数据错误
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(3306),
        DATABASE_USER: Joi.required(),
      }),
    }), //默认解析 .env 并把键值对与 process.env 相结合
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true, // 每次启动的时候自动创建数据库 会导致数据丢失
      autoLoadEntities: true, // 自动加载
    }),
    CatsModule,
    CoffeesModule,
    CoffeeRatingModule,
    DataBaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
