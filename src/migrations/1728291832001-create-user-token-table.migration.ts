import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class CreateForgotPasswordTokenTable1728291832001 extends BaseMigration {
  async run(_queryRunner: QueryRunner): Promise<void> {
    await this.create('UserToken', (table) => {
      table.primaryUuid('id');
      table.string('token');
      table.string('type');
      table.timestamp('disabledAt').nullable();
      table.timestamp('expiresAt').nullable();
      table.uuid('userId').index().foreign('User');
      table.createdAt();
      table.updatedAt();
    });
  }

  async rollback(): Promise<void> {
    await this.drop('UserToken');
  }
}
