import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Consultant } from '../../../../blueprints/guards/Consultant';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../entities/Appointment.entity';
import { OfficialMessageResource } from '../../resources/OfficialMessageResource';
import { ConferenceService } from '../../services/ConferenceService';
import { Parameters } from './Parameters';

@Controller()
export class SwitchConferenceSlide extends ResourceController {
  public static Resource = OfficialMessageResource;

  constructor(private conferenceService: ConferenceService) {
    super();
  }

  // todo: check if consultant is presenter
  @UseGuards(Consultant)
  @Put('/appointments/:id/conference/slide')
  async serve(
    @Param(new EntityById(Appointment, 'id'))
    appointment: Appointment,
    @Body() params: Parameters,
  ): Promise<OfficialMessageResource> {
    const message = await this.conferenceService.createSwitchSlideMessage(
      appointment,
      params.presentationIndex,
    );

    return OfficialMessageResource.make(message);
  }
}
