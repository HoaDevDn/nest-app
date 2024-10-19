import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner } from 'typeorm';
import { RoleEnum } from '~modules/authorization/enums/role.enum';

export class InsertUserProFileForAdmin1729151120622 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    const admin = await queryRunner.query(
      'SELECT "User".id FROM "User" INNER JOIN "Role" ON "Role".id = "User"."roleId" AND "Role".key = $1',
      [RoleEnum.SYSTEM_ADMIN],
    );
    await queryRunner.query(
      `INSERT INTO "UserProfile" (id, "displayId", "fullName", address, "dateOfBirth", gender, metadata, "userId",
                                      "createdAt", "updatedAt", "contactEmail", "avatarId", "locationProfileId")
                VALUES (DEFAULT, $1::varchar(255), $2::varchar(255), null::varchar(255), null::date, null::varchar(255), DEFAULT,
                        $3::uuid, DEFAULT, DEFAULT, null::varchar(255), null::uuid, null::uuid)`,
      ['000000000', 'Admin', admin[0].id],
    );
  }
}
