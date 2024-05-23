import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablesWorkerAndWorkingPlans1716113615436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'start_work_year',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'working_plans',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'working_day',
            type: 'enum',
            enum: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
            isNullable: false,
          },
          {
            name: 'start_working_hour',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'end_working_hour',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'start_break_hour',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'end_break_hour',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'worker_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'working_plans',
      new TableForeignKey({
        columnNames: ['worker_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workers',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('working_plans');
    await queryRunner.dropTable('workers');
  }
}
