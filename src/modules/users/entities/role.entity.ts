import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'core/entities/base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 255 }) // emitDecoratorMetadata: true (we can remove { type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[];
}
