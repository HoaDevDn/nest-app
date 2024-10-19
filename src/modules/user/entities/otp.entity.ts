import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OtpTypeEnum } from '../enums/otp.enum';
import { UserEntity } from './user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { TimestampTransformer } from '~core/entities/timestamp.transformer';

@Entity('Otp')
export class OtpEntity extends BaseEntity {
  @Column()
  token: string;

  @Column()
  type: OtpTypeEnum;

  @Column({ nullable: true })
  phoneNumber: string | null;

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

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
