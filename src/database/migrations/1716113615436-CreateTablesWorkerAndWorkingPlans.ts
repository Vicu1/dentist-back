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
        name: 'worker_working_plans',
        columns: [
          {
            name: 'worker_id',
            type: 'int',
          },
          {
            name: 'working_plan_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'worker_working_plans',
      new TableForeignKey({
        columnNames: ['worker_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'worker_working_plans',
      new TableForeignKey({
        columnNames: ['working_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'working_plans',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('worker_working_plans');
    await queryRunner.dropTable('working_plans');
    await queryRunner.dropTable('workers');
  }
}
