import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { WeekDaysEnum } from '@/app/modules/working-plan/types/week-days.enum';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';

@Entity('working_plans')
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

  @Column({
    type: 'time',
    nullable: true,
  })
  start_break_hour: Date;

  @Column({
    type: 'time',
    nullable: true,
  })
  end_break_hour: Date;

  @Column({
    nullable: false,
    type: 'int',
  })
  worker_id: number;

  @ManyToOne(() => WorkerEntity, (worker) => worker.working_plans)
  @JoinColumn({ name: 'worker_id' })
  worker: WorkerEntity;
}
