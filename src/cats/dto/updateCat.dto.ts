import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './createCat.dto';

// 并且继承了 所有校验器的规则
// PartialType- 返回一个类型（类），其中输入类型的所有属性都设置为可选（要求：至少 1 个验证装饰器应用于每个属性）
// PickType- 通过从输入类型中选择一组属性来构造一个新类型（类）
// OmitType- 通过从输入类型中选择所有属性然后删除一组特定的键来构造一个类型
// IntersectionType- 将两种类型合并为一种新类型（类）
export class UpdateCatDto extends PartialType(CreateCatDto) {}
