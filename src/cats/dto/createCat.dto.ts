import { IsNumberString, IsNumber, IsString } from 'class-validator';
// 校验牛逼啊

export class CreateCatDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
