import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  // 使用service
  constructor(private catsService: CatsService) {}

  @Get()
  getHello(): string {
    return 'hello cats';
  }

  @Get('findAll')
  async findAll(): Promise<CreateCatDto[]> {
    return this.catsService.findAll();
  }

  // 路由参数的两种方式
  @Get('/find/:id')
  findOne(@Param() params): string {
    console.log(params);
    return `This action returns a #${params.id} cat`;
  }

  @Get('/find2/:id')
  findOne2(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return '创建成功';
  }
}
