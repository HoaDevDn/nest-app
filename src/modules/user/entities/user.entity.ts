import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { TimestampTransformer } from '~core/entities/timestamp.transformer';
import { LoginHistoryEntity } from '~modules/authentication/entities/login-history.entity';
import { RoleEntity } from '~modules/authorization/entities/role.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: true })
  email: string | null;

  @Column({ select: false })
  password?: string;

  @Column({ type: 'uuid', nullable: true })
  lastAccessedLoginId: string | null;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'uuid' })
  roleId: string;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  deletedAt: Date | null;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @OneToMany(() => LoginHistoryEntity, (history) => history.user)
  loginHistories: LoginHistoryEntity[];

  @OneToOne(() => UserProfileEntity, (profile) => profile.user)
  profile: UserProfileEntity;

  @OneToOne(() => LoginHistoryEntity, (history) => history.user)
  lastAccessed: LoginHistoryEntity | null;
}
