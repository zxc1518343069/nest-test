import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DataBaseModule } from './data-base/data-base.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest',
      // entities: [],
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
