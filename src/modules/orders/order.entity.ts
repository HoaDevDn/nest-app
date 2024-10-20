import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'core/entities/base.entity';
import { Car } from '~modules/cars/car.entity';
import { User } from '~modules/users/entities/user.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Car, (car) => car.orders, { cascade: true })
  car: Car;

  // @Column({ name: 'customerId' })
  @ManyToOne(() => User, (user) => user.orders, { cascade: true })
  user: User;
}
