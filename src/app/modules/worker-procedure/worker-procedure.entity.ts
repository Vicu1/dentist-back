import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';

@Entity('workers_procedures')
export class WorkerProcedureEntity extends TimestampEntity {
  @PrimaryColumn()
  worker_id: number;

  @PrimaryColumn()
  procedure_id: number;

  @ManyToOne(() => WorkerEntity, (worker) => worker.procedures)
  @JoinColumn({ name: 'worker_id' })
  worker: WorkerEntity;

  @ManyToOne(() => ProcedureEntity, (procedure) => procedure.workers)
  @JoinColumn({ name: 'procedure_id' })
  procedure: ProcedureEntity;
}
