import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class AlterColumnsFromUserProfileTable1728982529100 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table "UserProfile" rename column sex to gender',
    );

    await this.update('UserProfile', (table) => {
      table.dropColumn('avatarUrl');

      table.uuid('avatarId').unique().index().nullable();
      table
        .uuid('locationProfileId')
        .index()
        .nullable()
        .foreign('LocationProfile');
    });
  }

  async rollback(): Promise<void> {
    await this.update('UserProfile', (table) => {
      table.dropColumn('avatarId');
      table.dropColumn('locationProfileId');
    });
  }
}
