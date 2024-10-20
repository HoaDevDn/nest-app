import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderTable1729395014155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'totalPrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
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
          {
            name: 'customerId',
            type: 'uuid',
          },
          {
            name: 'carId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['customerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['carId'],
            referencedTableName: 'car',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
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
