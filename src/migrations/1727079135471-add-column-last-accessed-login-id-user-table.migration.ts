import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class AddColumnLastAccessedLoginIdToUserTable1727079135471 extends BaseMigration {
  async run(_queryRunner: QueryRunner): Promise<void> {
    await this.update('User', (table) => {
      table
        .uuid('lastAccessedLoginId')
        .index()
        .nullable()
        .foreign('LoginHistory');
    });
  }

  async rollback(): Promise<void> {
    await this.update('User', (table) => {
      table.dropColumn('lastAccessedLoginId');
    });
  }
}
