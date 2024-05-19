import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { TimestampEntity } from '@/app/entities/timestamp.entity';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';

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

  @ManyToMany(() => WorkingPlanEntity, (workingPlan) => workingPlan.workers)
  @JoinTable({
    name: 'worker_working_plans',
    joinColumn: {
      name: 'worker_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'working_plan_id',
      referencedColumnName: 'id',
    },
  })
  working_plans: WorkingPlanEntity[];
}
