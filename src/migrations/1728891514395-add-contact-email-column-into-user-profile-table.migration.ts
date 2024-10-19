import { BaseMigration } from '@hodfords/typeorm-helper';

export class AddContactEmailColumnInToUserProfileTable1728891514395 extends BaseMigration {
  async run(): Promise<void> {
    await this.update('UserProfile', (table) => {
      table.string('contactEmail').nullable();
    });
  }

  async rollback(): Promise<void> {
    await this.update('UserProfile', (table) => {
      table.dropColumn('contactEmail');
    });
  }
}
