import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'core/entities/base.entity';
import { UserStatusEnum } from '../user.enum';
import { Role } from './role.entity'; // Import Role entity
import { UserResetPassword } from './user-reset-password.entity';
import { Order } from '~modules/orders/order.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserStatusEnum.UnActive, enum: UserStatusEnum })
  status: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  // @JoinColumn({ name: 'roleId' }) // có thể có hoặc không
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password before storing it
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => UserResetPassword, (resetPassword) => resetPassword.user)
  resetPasswords: UserResetPassword[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
