import { Controller, UseGuards, UsePipes } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { InsecureRoute } from '../../../../blueprints/decorators/InsecureRoute';
import { ResourceInterceptor } from '../../../../bootstrap/interceptors/ResourceInterceptor';
import { getValidationPipe } from '../../../../bootstrap/pipes/setupPipes';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { ConferenceResource } from '../../resources/ConferenceResource';
import { ConferencesService } from '../../services/ConferencesService';
import { ConferenceClient } from '../../types/ConferenceClient';
import { CommandGuard } from './guards/CommandGuard';
import { LoginGuard } from './guards/LoginGuard';
import { SwitchSlideParameters } from './parameters/SwitchSlideParameters';

@Controller()
@WebSocketGateway({ path: '/conferences' })
@UsePipes(getValidationPipe())
export class ConferenceGateway {
  @WebSocketServer() server: WebSocket.Server;

  constructor(private conferencesService: ConferencesService) {}

  // Todo: Generate requests code for this
  // This disables the default JWT auth, we use an auth based on the conference token here
  @InsecureRoute()
  @UseGuards(LoginGuard)
  @SubscribeMessage('authenticate')
  async authenticate(
    client: ConferenceClient,
  ): Promise<ConferenceResource | Record<string, never>> {
    const appointment = await Appointment.findOne(client.appointmentId);

    if (!appointment) {
      client.terminate();
      return {};
    }

    return ConferenceGateway.makeConferenceResource(appointment);
  }

  @InsecureRoute()
  @UseGuards(CommandGuard)
  @SubscribeMessage('switch-slide')
  async switchSlide(
    client: ConferenceClient,
    data: SwitchSlideParameters,
  ): Promise<void> {
    const appointment = await Appointment.findOne(client.appointmentId);

    if (!appointment) {
      client.terminate();
      return;
    }

    await this.conferencesService.switchSlide(appointment, data.slideIndex);

    this.informClients(appointment);
  }

  private informClients(appointment: Appointment): void {
    for (const someClient of this.server.clients as Set<ConferenceClient>) {
      if (
        someClient.isAuthenticated &&
        someClient.appointmentId === appointment.id
      ) {
        someClient.send(
          JSON.stringify(ConferenceGateway.makeConferenceResource(appointment)),
        );
      }
    }
  }

  // This method is needed because the ResourceInterceptor is not used when doing someClient.send()
  // even if it was activated using @useInterceptors()
  // so we have to call it explicitly
  private static makeConferenceResource(
    appointment: Appointment,
  ): ConferenceResource {
    return ResourceInterceptor.mapResource(
      ConferenceResource.make(appointment),
      ConferenceResource,
    ) as ConferenceResource;
  }
}
