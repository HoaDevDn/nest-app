import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { TimestampTransformer } from './timestamp.transformer';

export abstract class BaseEntity {
  static getNewId() {
    return uuidV4();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  createdAt: Date | number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  updatedAt: Date | number;
}
