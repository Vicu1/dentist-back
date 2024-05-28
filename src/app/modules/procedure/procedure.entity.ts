import { Column, Entity, OneToMany } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { WorkerProcedureEntity } from '@/app/modules/worker-procedure/worker-procedure.entity';

@Entity('procedures')
export class ProcedureEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 1000,
  })
  descriptions: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  duration: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  price: number;

  @OneToMany(
    () => WorkerProcedureEntity,
    (workerProcedure) => workerProcedure.procedure,
  )
  workers: WorkerProcedureEntity[];
}
