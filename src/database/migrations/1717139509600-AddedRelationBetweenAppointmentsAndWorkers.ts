import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddedRelationBetweenAppointmentsAndWorkers1717139509600
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'worker_id',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['worker_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workers',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('appointments');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('worker_id') !== -1,
    );
    await queryRunner.dropForeignKey('appointments', foreignKey);
    await queryRunner.dropColumn('appointments', 'worker_id');
  }
}
