import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserTokenTypeEnum } from '../enums/user-token.enum';
import { UserEntity } from './user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { TimestampTransformer } from '~core/entities/timestamp.transformer';

@Entity('UserToken')
export class UserTokenEntity extends BaseEntity {
  @Column()
  token: string;

  @Column()
  type: UserTokenTypeEnum;

  @Column({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
    nullable: true,
  })
  disabledAt: number | Date | null;

  @Column({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
    nullable: true,
  })
  expiresAt: number | Date | null;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
