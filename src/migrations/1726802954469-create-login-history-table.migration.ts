import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class CreateLoginHistoryTable1726802954469 extends BaseMigration {
  async run(_queryRunner: QueryRunner): Promise<void> {
    await this.create('LoginHistory', (table) => {
      table.primaryUuid('id');
      table.uuid('userId').index().foreign('User');
      table.string('ip');
      table.timestamp('disableAt').nullable();
      table.timestamp('expiresAt');
      table.timestamp('lastAccessedAt').nullable();
      table.string('loginAddress').nullable();
      table.string('loginDevice').nullable();
      table.createdAt();
      table.updatedAt();
    });
  }

  async rollback(): Promise<void> {
    await this.drop('LoginHistory');
  }
}
