import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) // 将生成的储存库注入到
    private catsRepository: Repository<Cat>,
  ) {}

  async create(cat: CreateCatDto) {
    const { firstName } = cat;
    const oldCat = await this.find(cat);
    if (oldCat) {
      throw new HttpException('Cat已存在', HttpStatus.UNAUTHORIZED);
    }
    const newCat = await this.catsRepository.create(cat);
    return await this.catsRepository.save(newCat);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async find(createCatDto: CreateCatDto): Promise<Cat> {
    const { firstName } = createCatDto;
    return await this.catsRepository.findOne({ where: { firstName } });
  }
  async upDate(id: number, updateCatDto: UpdateCatDto) {
    const res = await this.catsRepository.preload({
      id: +id,
      ...updateCatDto,
    });
    if (!res) {
      throw new NotFoundException(`${id} 没找到`);
    }
    return this.catsRepository.save(res);
  }
}
