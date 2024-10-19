import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';

export class FormatDisplayId1729161364031 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'update "UserProfile" set "displayId" = concat("left"("displayId", 5), "right"("displayId", 3)) where "displayId" like \'U%\';',
    );
  }
}
