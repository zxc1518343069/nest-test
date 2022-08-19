import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavour } from './flavour.entity';

@Entity() // sql table === 'coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  // to test out migration, change name => title
  @Column()
  name: string;

  // 参数参考https://typeorm.bootcss.com/entities#%E5%88%97%E9%80%89%E9%A1%B9
  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @JoinTable 应用于指定关系，指定这是关系的所有者方 通常放置在主要操作的那个表中
  // https://typeorm.bootcss.com/relations#jointable%E9%80%89%E9%A1%B9

  // ManyToMany config
  //   eager: booleanfind*- 如果设置为 true，则在使用方法或QueryBuilder在此实体上时，关系将始终与主实体一起加载
  // cascade: boolean | ("insert" | "update")[]- 如果设置为 true，相关对象将在数据库中插入和更新。
  // onDelete: "RESTRICT"|"CASCADE"|"SET NULL"- 指定删除引用对象时外键的行为方式
  // nullable: boolean- 指示此关系的列是否可以为空。默认情况下它可以为空。
  // orphanedRowAction: "nullify" | "delete" | "soft-delete"- 当子行从其父行中删除时，确定子行应该是孤立的（默认）还是删除（删除或软删除）。
  //  这个方法传递两个参数第一个参数为一个回调函数，直接指向绑定关联的实体类，第二个参数也是一个回调函数，但是包含一个参数，这个参数代指第一个参数中的实体类

  // cascade 级联 这个字段更新了，相关联的表子段也要更新。
  @JoinTable()
  @ManyToMany((type) => Flavour, (flavour) => flavour.coffees, {
    cascade: true,
  })
  flavours: Flavour[];
}
