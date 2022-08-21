import { COFFEE_BRANDS, COFFEE_BRANDS_VALUES } from './const/coffees.constants';
import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from 'src/events/entities/event.entity';
import { DataSource } from 'typeorm';
import { DataBaseModule } from 'src/data-base/data-base.module';

class Config {}

class developmentConfig {}

class proConfig {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    const values = [...COFFEE_BRANDS_VALUES];
    values.push('qwe');
    return values;
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavour, Event]),
    // 动态模块
    // DataBaseModule.register({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456',
    //   database: 'nest',
    //   // entities: [],
    //   synchronize: true, // 每次启动的时候自动创建数据库 会导致数据丢失
    // }),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // {
    //   provide: COFFEE_BRANDS,
    //   useValue: COFFEE_BRANDS_VALUES, // 这样还是有些繁琐了。直接导入也能用
    // },
    // 使用useClass 根据环境不同注入不同的class
    {
      provide: Config,
      useClass:
        process.env.NODE_ENV === 'development' ? developmentConfig : proConfig, // 这样还是有些繁琐了。直接导入也能用
    },
    // useFactory 动态提供 provider
    {
      // 参考链接  inject 有顺序
      // https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory
      provide: CoffeeBrandsFactory,
      useFactory(brandsFactory: CoffeeBrandsFactory) {
        return brandsFactory.create();
      },
      inject: [CoffeeBrandsFactory], // 注入配置依赖项
    },
    // 异步 也可以用作 mock 函数
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: DataSource) => {
        const connect = await connection.createQueryRunner();
        await connect.connect();
        await connect.startTransaction();
        return connect;
      },
      inject: [DataSource], // 注入配置依赖项
    },
    CoffeeBrandsFactory,
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
