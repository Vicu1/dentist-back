import { HttpException, Injectable } from '@nestjs/common';
import { WeekDaysEnum } from '@/app/modules/working-plan/types/week-days.enum';
import { WorkingPlanRepository } from '@/app/modules/working-plan/working-plan.repository';
import { WorkingPlanUpdateDto } from '@/app/modules/working-plan/dto/working-plan-update.dto';

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

  async update(workingPlanUpdateDto: WorkingPlanUpdateDto[]) {
    try {
      for (const plan of workingPlanUpdateDto) {
        await this.workingPlanRepository.update(plan.id, plan);
      }
    } catch (e) {
      throw new HttpException(e, e.status);
    }
  }

  async getPlansForWorker(worker_id: number) {
    return await this.workingPlanRepository.find({ where: { worker_id } });
  }
}
