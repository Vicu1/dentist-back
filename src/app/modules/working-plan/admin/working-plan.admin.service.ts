import { Injectable } from '@nestjs/common';
import { WeekDaysEnum } from '@/app/modules/working-plan/types/week-days.enum';
import { WorkingPlanRepository } from '@/app/modules/working-plan/working-plan.repository';

@Injectable()
export class WorkingPlanAdminService {
  constructor(private readonly workingPlanRepository: WorkingPlanRepository) {}

  async create(worker_id: number) {
    for (const day in WeekDaysEnum) {
      await this.workingPlanRepository.save({
        worker_id,
        working_day: WeekDaysEnum[day],
        start_working_hour: '08:00',
        end_working_hour: '17:00',
        start_break_hour: '12:00',
        end_break_hour: '12:30',
      });
    }
  }
}
