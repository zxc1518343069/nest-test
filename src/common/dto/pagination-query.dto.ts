import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive() // 大于0
  @IsOptional() // 可选
  @Type(() => Number) // 保证值返回为number
  limit: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
