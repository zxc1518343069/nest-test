import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index() // 优化数据库缓存使用的
  @Column()
  name: string;

  // payload 是存储事件有效负载通用列
  @Column('json')
  payload: Record<string, any>;
}
