import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { parseISO } from 'date-fns';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Consultant } from '../../../../blueprints/guards/Consultant';
import { AppointmentsService } from '../../services/AppointmentsService';
import { Resource } from './Resource';

@Controller()
export class CreateAppointment extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/appointments')
  async serve(): Promise<Resource> {
    const start = parseISO('2020-11-10T09:00');
    const end = parseISO('2021-11-20T09:00');

    await this.appointmentsService.add(start, end);

    return Resource.make();
  }
}
