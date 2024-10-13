import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'core/entities/base.entity';
import { User } from './user.entity';

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
