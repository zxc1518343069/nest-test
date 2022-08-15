import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
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
}
