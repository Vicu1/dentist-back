import { Column, Entity, OneToMany } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';

@Entity('offices')
export class OfficeEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
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
  phone: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  address: string;

  @OneToMany(() => WorkerEntity, (worker) => worker.office)
  workers: WorkerEntity[];
}
