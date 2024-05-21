import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateOfficeTable1716301518494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'offices',
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
            length: '50',
            isNullable: false,
          },
          {
            name: 'descriptions',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    await queryRunner.addColumn(
      'workers',
      new TableColumn({
        name: 'office_id',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'workers',
      new TableForeignKey({
        columnNames: ['office_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'offices',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('offices');
    const table = await queryRunner.getTable('workers');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('office_id') !== -1,
    );
    await queryRunner.dropForeignKey('workers', foreignKey);
    await queryRunner.dropColumn('workers', 'office_id');
  }
}
