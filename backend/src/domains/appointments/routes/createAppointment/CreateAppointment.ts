import { Controller, Post } from '@nestjs/common';
import { SecureResourceController } from '../../../../bootstrap/blueprints/SecureResourceController';
import { Resource } from './Resource';
import { AppointmentsService } from '../../services/AppointmentsService';
import { parse, parseISO } from 'date-fns';

@Controller()
export class CreateAppointment extends SecureResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  // todo: role-based protection
  @Post('/appointments')
  async serve(): Promise<Resource> {
    const start = parseISO('2020-11-10T09:00');
    const end = parseISO('2020-11-20T09:00');

    const appointment = await this.appointmentsService.add(start, end);

    return Resource.make(appointment);
  }
}
