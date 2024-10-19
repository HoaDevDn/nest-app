import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';
import { RoleEntity } from '~modules/authorization/entities/role.entity';
import { RoleEnum } from '~modules/authorization/enums/role.enum';

export class InsertDataRoleTable1726714091472 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await this.createRole(queryRunner, {
      displayName: 'System admin',
      key: RoleEnum.SYSTEM_ADMIN,
    });
    await this.createRole(queryRunner, {
      displayName: 'User normal',
      key: RoleEnum.NORMAL_USER,
    });
  }

  private async createRole(
    queryRunner: QueryRunner,
    { displayName, key }: Partial<RoleEntity>,
  ): Promise<void> {
    await queryRunner.query(
      'INSERT INTO "Role" ("displayName", "key") VALUES ($1, $2)',
      [displayName, key],
    );
  }
}
