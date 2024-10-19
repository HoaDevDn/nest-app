import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class UpdateDisplayId1729157164923 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'UPDATE "UserProfile" SET "displayId" = CONCAT(\'U\', "displayId") where "displayId" NOT LIKE \'U%\';',
    );
  }
}
