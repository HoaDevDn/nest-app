import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';
import { BaseEntity } from '~core/entities/base.entity';
import { TimestampTransformer } from '~core/entities/timestamp.transformer';
import { UserEntity } from '~modules/user/entities/user.entity';

@Entity('Role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  displayName: string;

  @Column({ type: 'varchar', nullable: true })
  key?: RoleEnum;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  deletedAt: Date | null;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
