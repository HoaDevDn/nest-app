import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class CreateOtpTable1728289233000 extends BaseMigration {
  async run(_queryRunner: QueryRunner): Promise<void> {
    await this.create('Otp', (table) => {
      table.primaryUuid('id');
      table.string('token');
      table.string('type');
      table.string('phoneNumber').nullable();
      table.timestamp('disabledAt').nullable();
      table.timestamp('expiresAt').nullable();
      table.uuid('userId').index().nullable().foreign('User');
      table.createdAt();
      table.updatedAt();
    });
  }

  async rollback(): Promise<void> {
    await this.drop('Otp');
  }
}
