import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';
import { OfficeEntity } from '@/app/modules/office/office.entity';
import { WorkerProcedureEntity } from '@/app/modules/worker-procedure/worker-procedure.entity';

@Entity('workers')
export class WorkerEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  first_name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  last_name: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  start_work_year: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  office_id: number;

  @OneToMany(() => WorkingPlanEntity, (workingPlan) => workingPlan.worker)
  working_plans: WorkingPlanEntity[];

  @ManyToOne(() => OfficeEntity, (office) => office.workers)
  @JoinColumn({ name: 'office_id' })
  office: OfficeEntity;

  @OneToMany(
    () => WorkerProcedureEntity,
    (workerProcedure) => workerProcedure.worker,
  )
  procedures: WorkerProcedureEntity[];
}
