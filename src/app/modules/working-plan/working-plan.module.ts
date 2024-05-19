import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingPlanEntity])],
})
export class WorkingPlanModule {}
