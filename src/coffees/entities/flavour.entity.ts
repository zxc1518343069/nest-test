import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Coffee } from './coffee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Flavour {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '口味' })
  @Column()
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavours)
  @ApiProperty({ description: '咖啡种类' })
  coffees: Coffee[];
}
