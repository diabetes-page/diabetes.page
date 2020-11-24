import { Controller, Post } from '@nestjs/common';
import { ResourceController } from '../../../../bootstrap/blueprints/ResourceController';
import { Resource } from './Resource';
import { AppointmentsService } from '../../services/AppointmentsService';
import { parse, parseISO } from 'date-fns';

@Controller()
export class CreateAppointment extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  // todo: role-based protection
  @Post('/appointments')
  async serve(): Promise<Resource> {
    const start = parseISO('2020-11-10T09:00');
    const end = parseISO('2021-11-20T09:00');

    const appointment = await this.appointmentsService.add(start, end);

    return Resource.make(appointment);
  }
}
