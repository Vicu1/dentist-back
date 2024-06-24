import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@/app/modules/client/client.entity';
import { ClientAdminController } from '@/app/modules/client/admin/client.admin.controller';
import { ClientRepository } from '@/app/modules/client/client.repository';
import { ClientAdminService } from '@/app/modules/client/admin/client.admin.service';
import { AppointmentModule } from '@/app/modules/appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    forwardRef(() => AppointmentModule),
  ],
  controllers: [ClientAdminController],
  exports: [ClientAdminService],
  providers: [ClientRepository, ClientAdminService],
})
export class ClientModule {}
