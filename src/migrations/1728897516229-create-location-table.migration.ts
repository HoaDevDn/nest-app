import { BaseMigration } from '@hodfords/typeorm-helper';
import { QueryRunner, TableIndex } from 'typeorm';

export class CreateLocationTable1728897516229 extends BaseMigration {
  async run(queryRunner: QueryRunner): Promise<void> {
    await this.create('Location', (table) => {
      table.primaryUuid();
      table.baseTime();
      table.deletedAt();
      table.string('countryCode');
      table.string('name');
      table.uuid('parentId').nullable().foreign('Location');
      table.smallint('level');
      table.string('code');
      // eslint-disable-next-line quotes
      table.uuids('ancestorIds').default("'{}'");
    });

    await queryRunner.createIndex(
      'Location',
      new TableIndex({ columnNames: ['countryCode', 'parentId'] }),
    );
  }

  async rollback(_queryRunner: QueryRunner): Promise<void> {
    await this.drop('Location');
  }
}
