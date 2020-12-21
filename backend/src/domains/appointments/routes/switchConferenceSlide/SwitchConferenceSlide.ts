import { Body, Controller, Param, Put } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentById } from '../../pipes/AppointmentById';
import { ConferenceService } from '../../services/ConferenceService';
import { Parameters } from './Parameters';
import { OfficialMessageResource } from '../../resources/Resource';

@Controller()
export class SwitchConferenceSlide extends ResourceController {
  public static Resource = OfficialMessageResource;

  constructor(private conferenceService: ConferenceService) {
    super();
  }

  // todo: role-based protection, check users and appointment.startsAt
  @Put('/appointments/:id/conference/slide')
  async serve(
    @Param(AppointmentById) appointment: Appointment,
    @Body() params: Parameters,
  ): Promise<OfficialMessageResource> {
    const message = this.conferenceService.createSwitchSlideMessage(
      appointment,
      params.slideIndex,
    );

    // todo: Save new slide index

    return OfficialMessageResource.make(message);
  }
}
