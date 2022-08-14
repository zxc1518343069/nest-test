import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsModule],
  imports: [TypeOrmModule.forFeature([Cat])],
})
export class CatsModule {}
