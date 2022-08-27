import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: '名字' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '品牌' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: '种类', example: [] })
  @IsString({ each: true })
  readonly flavours: string[];
}
