import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from 'core/entities/base.entity';

@Entity()
export class UserResetPassword extends BaseEntity {
  @Column()
  resetPasswordToken: string;

  @Column({ type: 'timestamptz' }) // Store timestamp with timezone
  resetPasswordExpires: Date;

  @CreateDateColumn()
  createdAt: Date;

  // Liên kết với bảng User
  @ManyToOne(() => User, (user) => user.resetPasswords, { onDelete: 'CASCADE' })
  user: User;
}
