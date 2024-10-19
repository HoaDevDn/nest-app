import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class CreateRoleTable1726714091470 extends BaseMigration {
  async run(_queryRunner: QueryRunner): Promise<void> {
    await this.create('Role', (table) => {
      table.primaryUuid('id');
      table.string('displayName');
      table.string('key').unique().nullable().index();
      table.createdAt();
      table.updatedAt();
      table.deletedAt();
    });
  }

  async rollback(): Promise<void> {
    await this.drop('Role');
  }
}
