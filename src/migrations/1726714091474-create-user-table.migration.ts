import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';
import { RoleEnum } from '~modules/authorization/enums/role.enum';
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_ADMIN_PHONE_NUMBER,
} from '~modules/user/constants/default-user-values.constant';
import { PasswordHelper } from '~modules/user/helpers/password.helper';

export class CreateUserTable1726714091474 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await this.create('User', (table) => {
      table.primaryUuid('id');
      table.string('email').nullable().unique();
      table.string('password');
      table.string('phoneNumber').index().unique();
      table.uuid('roleId').index().foreign('Role');
      table.createdAt();
      table.updatedAt();
      table.deletedAt();
    });

    const password = await PasswordHelper.hash(DEFAULT_ADMIN_PASSWORD);
    const adminRole = await queryRunner.query(
      `SELECT id FROM "Role" WHERE "key" = '${RoleEnum.SYSTEM_ADMIN}';`,
    );

    await queryRunner.query(`
      INSERT INTO "User" (email, password, "roleId", "phoneNumber")
      VALUES ('${DEFAULT_ADMIN_EMAIL}', '${password}', '${adminRole[0].id}', '${DEFAULT_ADMIN_PHONE_NUMBER}');
    `);
  }

  async rollback(): Promise<void> {
    await this.drop('User');
  }
}
