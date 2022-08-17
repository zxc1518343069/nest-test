import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
    });
    // 两种方式都可以
    const coffee2 = await this.coffeeRepository.findOneBy({
      id,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee2;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // const flavours = await Promise.all(
    //   createCoffeeDto.flavours.map((name) => this.preloadFlavourByName(name)),
    // );

    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
