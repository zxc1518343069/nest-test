import { CoffeesService } from './../coffees/coffees.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeRatingService {
  // 这时候这个模块就可以用了
  private readonly CoffeesService: CoffeesService;
}
