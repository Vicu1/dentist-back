import { Column, Entity } from 'typeorm';
import { TimestampEntity } from '@/app/entities/timestamp.entity';

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
  })
  description: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  phone: string;
}
