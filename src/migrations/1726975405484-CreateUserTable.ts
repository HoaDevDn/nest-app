import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { UserStatusEnum } from '~modules/users/user.enum';

export class CreateUserTable1726975405484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create "user" table
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            default: UserStatusEnum.Active,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'roleId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: true,
            default: null,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Add foreign key constraint to "user" table for "roleId"
    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedTableName: 'role',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userResetTable = await queryRunner.getTable('user_reset_password');
    const userResetForeignKey = userResetTable!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    if (userResetForeignKey) {
      await queryRunner.dropForeignKey(
        'user_reset_password',
        userResetForeignKey,
      );
    }

    const orderTable = await queryRunner.getTable('order');
    const orderForeignKey = orderTable!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    if (orderForeignKey) {
      await queryRunner.dropForeignKey('order', orderForeignKey);
    }

    await queryRunner.dropTable('user');
  }
}
