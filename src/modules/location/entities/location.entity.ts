import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { TimestampTransformer } from '~core/entities/timestamp.transformer';

@Entity('Location')
export class LocationEntity extends BaseEntity {
  @Column({ nullable: true })
  parentId: string | null;

  @Column()
  countryCode: string;

  @Column()
  name: string;

  @Column()
  level: number;

  @Column()
  code: string;

  @Column({ type: 'uuid', array: true })
  ancestorIds: string[];

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  deletedAt: Date | null;

  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'parentId' })
  parentLocation: LocationEntity;
}
