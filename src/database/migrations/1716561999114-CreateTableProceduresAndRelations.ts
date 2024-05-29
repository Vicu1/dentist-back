import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableProceduresAndRelations1716561999114
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'procedures',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            length: '100',
          },
          {
            name: 'descriptions',
            type: 'varchar',
            isNullable: true,
            length: '1000',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'price',
            type: 'int',
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
        name: 'workers_procedures',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'worker_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'procedure_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'workers_procedures',
      new TableForeignKey({
        columnNames: ['worker_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workers',
      }),
    );

    await queryRunner.createForeignKey(
      'workers_procedures',
      new TableForeignKey({
        columnNames: ['procedure_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'procedures',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('worker_procedures');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('worker_id') !== -1,
    );
    const foreignKeyProcedures = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('procedure_id') !== -1,
    );
    await queryRunner.dropForeignKey('worker_procedures', foreignKey);
    await queryRunner.dropForeignKey('worker_procedures', foreignKeyProcedures);
    await queryRunner.dropTable('procedures');
    await queryRunner.dropTable('workers_procedures');
  }
}
