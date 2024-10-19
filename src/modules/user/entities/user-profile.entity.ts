import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { GenderEnum } from '../enums/gender.enum';
import { UserProfileMetadata } from '../interfaces/user-profile-metadata.interface';
import { LocationProfileEntity } from './location-profile.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { DateTransformer } from '~core/entities/date.transformer';

@Entity('UserProfile')
export class UserProfileEntity extends BaseEntity {
  @Column({ unique: true })
  displayId: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  address: string | null;

  @Column({
    type: 'date',
    transformer: new DateTransformer(),
    nullable: true,
  })
  dateOfBirth: Date | null;

  @Column({ nullable: true })
  gender: GenderEnum;

  @Column({ nullable: true })
  avatarId: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ type: 'jsonb' })
  metadata: UserProfileMetadata;

  @Column()
  userId: string;

  @Column({ nullable: true })
  locationProfileId: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(
    () => LocationProfileEntity,
    (locationProfile) => locationProfile.userProfile,
  )
  @JoinColumn({ name: 'locationProfileId' })
  location: LocationProfileEntity | null;
}
