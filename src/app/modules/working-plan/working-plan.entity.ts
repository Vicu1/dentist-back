import { Column, Entity, ManyToMany } from 'typeorm';
import { TimestampEntity } from '@/app/entities/timestamp.entity';
import { WeekDaysEnum } from '@/app/modules/working-plan/types/week-days.enum';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';

@Entity('working-plans')
export class WorkingPlanEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'enum',
    enum: WeekDaysEnum,
  })
  working_day: WeekDaysEnum;

  @Column({
    type: 'time',
    nullable: true,
  })
  start_working_hour: Date;

  @Column({
    type: 'time',
    nullable: true,
  })
  end_working_hour: Date;

  @ManyToMany(() => WorkerEntity, (worker) => worker.working_plans)
  workers: WorkerEntity[];
}
