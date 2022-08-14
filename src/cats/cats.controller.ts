import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
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
