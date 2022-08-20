import { CoffeesModule } from './../coffees/coffees.module';
import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule], // 导入之后 这里的service 就可以使用 Coffees 里面的东西了
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
