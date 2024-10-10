import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from 'core/entities/base.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 255 }) // emitDecoratorMetadata: true (we can remove { type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[];
}
