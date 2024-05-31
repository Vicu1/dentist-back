import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { StatusesEnum } from '@/app/modules/appointment/types/statuses.enum';
import { IsEnum } from 'class-validator';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { ClientEntity } from '@/app/modules/client/client.entity';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';

@Entity('appointments')
export class AppointmentEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'date',
  })
  day: Date;

  @Column({
    nullable: false,
    type: 'time',
  })
  start_time: string;

  @Column({
    nullable: false,
    type: 'time',
  })
  end_time: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: StatusesEnum,
    default: StatusesEnum.NEW,
  })
  @IsEnum(StatusesEnum)
  status: StatusesEnum;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 200,
  })
  comment: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  client_id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  procedure_id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  worker_id: number;

  @ManyToOne(() => ProcedureEntity, (procedure) => procedure.id)
  @JoinColumn({ name: 'procedure_id' })
  procedure: ProcedureEntity;

  @ManyToOne(() => WorkerEntity, (worker) => worker.id)
  @JoinColumn({ name: 'worker_id' })
  worker: WorkerEntity;

  @ManyToOne(() => ClientEntity, (client) => client.appointments)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
}
