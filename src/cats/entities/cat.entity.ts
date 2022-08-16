import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 可以手动赋值 'xxx'
export class Cat {
  // 设为id 并自动增加
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column({ default: true })
  isActive?: boolean;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // 设置类型和 配置
  @Column('json', { nullable: true })
  text: string;
}
