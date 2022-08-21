import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DataBaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DataBaseModule,
      providers: [
        {
          provide: 'DATA',
          useValue: new DataSource(options),
        },
      ],
    };
  }
}
