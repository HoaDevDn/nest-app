import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'core/entities/base.entity';
import { Role } from './role.entity'; // Import Role entity
import { UserResetPassword } from './user-reset-password.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 1 })
  status: number;

  @Column()
  password: string;

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
}
