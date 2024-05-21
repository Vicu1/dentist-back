import { Module } from '@nestjs/common';
import { OfficeService } from '@/app/modules/office/office.service';
import { OfficeRepository } from '@/app/modules/office/office.repository';
import { OfficeAdminController } from '@/app/modules/office/office.admin.controller';

@Module({
  controllers: [OfficeAdminController],
  providers: [OfficeService, OfficeRepository],
})
export class OfficeModule {}
