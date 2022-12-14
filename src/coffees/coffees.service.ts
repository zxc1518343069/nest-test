import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS, COFFEE_BRANDS_VALUES } from './const/coffees.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfigFn from './config/config';
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly flavorRepository: Repository<Flavour>,
    @InjectRepository(Event)
    private readonly connection: DataSource, // @Inject(COFFEE_BRANDS) COFFEE_BRANDS: string[],
    // @Inject(COFFEE_BRANDS) COFFEE_BRAND,
    private readonly config: ConfigService,
    @Inject(coffeesConfigFn.KEY)
    private readonly coffeesConfig: ConfigType<typeof coffeesConfigFn>, // @Inject(COFFEE_BRANDS) COFFEE_BRANDS: string[],
  ) {
    const dataBaseHost = this.config.get('DATABASE_HOST', 'default');
    const dataBaseHost2 = this.config.get('database.host', 'default');
    // console.log(coffeesConfig); // 可以通过属性的形式拿到 不需要用上述字符串形式
    // console.log(dataBaseHost, dataBaseHost2); // 获取env 配置信息
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // 可以只传递 limit  不能只穿 offset
    return await this.coffeeRepository.find({
      // 用于指定关系，否则将不会返回对应属性
      relations: ['flavours'],
      skip: offset,
      take: limit,
    });
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // 新建链接 链接成功 开始交易

    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      // 保存咖啡实体和事件实体
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction(); // 提交
    } catch (err) {
      await queryRunner.rollbackTransaction(); // 回滚
    } finally {
      await queryRunner.release(); // 关闭
    }
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
    const flavours = await Promise.all(
      createCoffeeDto.flavours.map((name) => this.preloadFlavourByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavours,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavours =
      (updateCoffeeDto.flavours &&
        (await Promise.all(
          updateCoffeeDto.flavours.map((name) =>
            this.preloadFlavourByName(name),
          ),
        ))) ??
      [];
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavours,
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

  private async preloadFlavourByName(name: string): Promise<Flavour> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
