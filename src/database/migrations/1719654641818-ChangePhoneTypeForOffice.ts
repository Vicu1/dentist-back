import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Changes1719654641818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'offices',
      'phone',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'offices',
      'phone',
      new TableColumn({
        name: 'phone',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
