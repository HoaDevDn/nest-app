import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { LocationEntity } from '~modules/location/entities/location.entity';

@Entity('LocationProfile')
export class LocationProfileEntity extends BaseEntity {
  @Column({ nullable: true })
  provinceId: string;

  @Column({ nullable: true })
  districtId: string;

  @Column({ nullable: true })
  wardId: string;

  @Column()
  address: string;

  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'provinceId' })
  province: LocationEntity;

  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'districtId' })
  district: LocationEntity;

  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'wardId' })
  ward: LocationEntity;

  @OneToOne(() => UserProfileEntity, (user) => user.location)
  userProfile: UserProfileEntity;
}
