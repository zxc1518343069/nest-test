import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
// 拦截器  ClassSerializerInterceptor 根据用户实体进行接口返回值过滤 但是返回是用户实体相关
// 可以单个接口 也可以这样直接所有接口
@UseInterceptors(ClassSerializerInterceptor)
export class CatsController {
  // 使用service
  constructor(private catsService: CatsService) {}

  @Get()
  getHello(): string {
    return 'hello cats';
  }

  @Get('findAll')
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('find')
  find(@Body() createCatDto: CreateCatDto) {
    return this.catsService.find(createCatDto);
  }

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    const res = await this.catsService.create(createCatDto);
    return res;
  }
}
