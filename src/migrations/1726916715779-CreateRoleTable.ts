import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleTable1726916715779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('roleId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('user', foreignKey);
    }
    await queryRunner.dropTable('role');
  }
}
