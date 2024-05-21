import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';
import { OfficeEntity } from '@/app/modules/office/office.entity';

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
  officeId: number;

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

  @ManyToOne(() => OfficeEntity, (office) => office.workers)
  office: OfficeEntity;
}
