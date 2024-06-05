import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppointmentCreateDto } from '@/app/modules/appointment/dto/appointment-create.dto';
import ConfigEnv from '@/config/config.env';
import * as dayjs from 'dayjs';

@Injectable()
export class AppointmentNotifyService {
  constructor() {}

  async sendTelegramNotification(
    appointmentCreateDto: AppointmentCreateDto,
    endTime: string,
    procedureName: string,
    workerName: string,
  ) {
    const message = `<b>У вас новая запись</b>\n
      <b>Клиент:</b> ${appointmentCreateDto.client_name}
      <b>Телефон клиента:</b> +373${appointmentCreateDto.client_phone}
      <b>День:</b> ${dayjs(appointmentCreateDto.day).format('DD.MM.YYYY')}
      <b>Время начала:</b> ${appointmentCreateDto.start_time}
      <b>Время окончания:</b> ${endTime}
      <b>Процедура:</b> ${procedureName}
      <b>Работник:</b> ${workerName}`;

    const url = `https://api.telegram.org/bot${ConfigEnv.TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await axios.post(url, {
        chat_id: ConfigEnv.TELEGRAM_BOT_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      });
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    }
  }
}
