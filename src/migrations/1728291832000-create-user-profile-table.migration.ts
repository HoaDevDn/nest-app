import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class CreateUserProfileTable1728291832000 extends BaseMigration {
  async run(_queryRunner: QueryRunner): Promise<void> {
    await this.create('UserProfile', (table) => {
      table.primaryUuid('id');
      table.string('displayId').unique();
      table.string('fullName');
      table.string('address').nullable();
      table.timestamp('dateOfBirth').nullable();
      table.string('sex').nullable();
      table.string('avatarUrl').nullable();
      // eslint-disable-next-line quotes
      table.jsonb('metadata').default("'{}'");
      table.uuid('userId').index().foreign('User');
      table.createdAt();
      table.updatedAt();
    });
  }

  async rollback(): Promise<void> {
    await this.drop('UserProfile');
  }
}
