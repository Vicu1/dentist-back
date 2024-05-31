import { HttpException, Injectable } from '@nestjs/common';
import { WeekDaysEnum } from '@/app/modules/working-plan/types/week-days.enum';
import { WorkingPlanRepository } from '@/app/modules/working-plan/working-plan.repository';
import { WorkingPlanUpdateDto } from '@/app/modules/working-plan/dto/working-plan-update.dto';
import * as dayjs from 'dayjs';
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

  async getPlansForWorkerAndDay(worker_id: number, day: Date) {
    const weekDay = dayjs(day).day();
    const days = {
      0: WeekDaysEnum.SUNDAY,
      1: WeekDaysEnum.MONDAY,
      2: WeekDaysEnum.TUESDAY,
      3: WeekDaysEnum.WEDNESDAY,
      4: WeekDaysEnum.THURSDAY,
      5: WeekDaysEnum.FRIDAY,
      6: WeekDaysEnum.SATURDAY,
    };

    return await this.workingPlanRepository.findOne({
      where: { worker_id, working_day: days[weekDay] },
    });
  }
}
