import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class AlterDateOfBirthTypeFromTimestampToDate1728900009433 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table "UserProfile" alter column "dateOfBirth" type date using "dateOfBirth"::date;',
    );
  }
}
