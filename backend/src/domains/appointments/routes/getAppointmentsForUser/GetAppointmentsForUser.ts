import { Controller, Get } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { User } from '../../../users/entities/User.entity';
import { AppointmentsService } from '../../services/AppointmentsService';
import { Resource } from './Resource';

@Controller()
export class GetAppointmentsForUser extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @Get('/appointments')
  async serve(@RequestUser() user: User): Promise<Resource> {
    const appointments = await this.appointmentsService.forUser(user);

    return Resource.make(appointments);
  }
}
