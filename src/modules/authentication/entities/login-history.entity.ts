import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { TimestampTransformer } from '~core/entities/timestamp.transformer';
import { UserEntity } from '~modules/user/entities/user.entity';

@Entity('LoginHistory')
export class LoginHistoryEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  ip: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  disableAt: Date | null;

  @Column({ type: 'timestamp', transformer: new TimestampTransformer() })
  expiresAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  lastAccessedAt: Date | null;

  @Column({ nullable: true })
  loginAddress: string | null;

  @Column({ nullable: true })
  loginDevice: string | null;

  @ManyToOne(() => UserEntity, (user) => user.loginHistories)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
