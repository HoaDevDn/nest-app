import { BaseMigration } from '@hodfords/typeorm-helper';

export class CreateLocationProfileTable1728961773923 extends BaseMigration {
  async run(): Promise<void> {
    await this.create('LocationProfile', (table) => {
      table.primaryUuid('id');
      table.uuid('provinceId').index().foreign('Location');
      table.uuid('districtId').index().foreign('Location');
      table.uuid('wardId').index().foreign('Location');
      table.string('address');
      table.createdAt();
      table.updatedAt();
    });
  }

  async rollback(): Promise<void> {
    await this.drop('LocationProfile');
  }
}
