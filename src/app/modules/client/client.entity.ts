import { Column, Entity, OneToMany } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { AppointmentEntity } from '@/app/modules/appointment/appointment.entity';

@Entity('clients')
export class ClientEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: '100',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  phone: number;

  @Column({
    nullable: false,
    type: 'boolean',
    default: false,
  })
  is_blocked: boolean;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.client)
  appointments: AppointmentEntity[];
}
