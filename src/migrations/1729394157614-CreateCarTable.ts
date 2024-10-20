import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarTable1729394157614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car',
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
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'varchar',
            length: '255',
            default: null,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const orderTable = await queryRunner.getTable('order');
    const orderForeignKey = orderTable!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('carId') !== -1,
    );
    if (orderForeignKey) {
      await queryRunner.dropForeignKey('order', orderForeignKey);
    }
    await queryRunner.dropTable('car');
  }
}
