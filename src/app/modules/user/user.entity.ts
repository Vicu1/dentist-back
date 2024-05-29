import { Column, Entity } from 'typeorm';
import { TimestampEntity } from '@/app/base/timestamp.entity';

@Entity('users')
export class UserEntity extends TimestampEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  password: string;
}
