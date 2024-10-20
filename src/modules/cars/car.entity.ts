import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'core/entities/base.entity';
import { CarStatusEnum } from './car.enum';
import { Order } from '~modules/orders/order.entity';

@Entity()
export class Car extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: CarStatusEnum.OutOfStock, enum: CarStatusEnum })
  status: CarStatusEnum;

  @Column({ type: 'text' })
  image: string;

  @Column({ nullable: true })
  year: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
