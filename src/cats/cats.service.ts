import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/createCat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(cat: CreateCatDto) {
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
}
