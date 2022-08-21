import { CoffeesService } from './../coffees/coffees.service';
import { Injectable, Scope } from '@nestjs/common';

// Scope.TRANSIENT 瞬态 多实例 默认单实例 即每次注册是都是一个全新的实例
// Scope.REQUEST 发生请求时才实例化
@Injectable()
export class CoffeeRatingService {
  // 这时候这个模块就可以用了
  private readonly CoffeesService: CoffeesService;
}
