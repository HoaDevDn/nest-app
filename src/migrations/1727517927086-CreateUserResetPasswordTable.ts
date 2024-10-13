import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserResetPasswordTable1727517927086
  implements MigrationInterface
{
  name = 'CreateUserResetPasswordTable1727517927086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng UserResetPassword
    await queryRunner.createTable(
      new Table({
        name: 'user_reset_password',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'resetPasswordToken',
            type: 'varchar',
          },
          {
            name: 'resetPasswordExpires',
            type: 'timestamptz',
          },
          {
            name: 'userId',
            type: 'uuid',
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
    );

    // Tạo khóa ngoại để liên kết với bảng User
    await queryRunner.createForeignKey(
      'user_reset_password',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_reset_password');
  }
}
