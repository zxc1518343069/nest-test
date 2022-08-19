import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  // payload 是存储事件有效负载通用列
  @Column('json')
  payload: Record<string, any>;
}
