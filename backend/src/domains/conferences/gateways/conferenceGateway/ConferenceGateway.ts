import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { InsecureRoute } from '../../../../blueprints/decorators/InsecureRoute';
import { ResourceInterceptor } from '../../../../bootstrap/interceptors/ResourceInterceptor';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { ConferenceResource } from '../../resources/ConferenceResource';
import { ConferenceClient } from '../../types/ConferenceClient';
import { CommandGuard } from './CommandGuard';
import { LoginGuard } from './LoginGuard';

@Controller()
@WebSocketGateway({ path: '/conferences' })
@UseInterceptors(ResourceInterceptor)
export class ConferenceGateway extends ResourceController {
  public static Resource = ConferenceResource;

  @WebSocketServer() server: WebSocket.Server;

  // Todo: Generate requests code for this
  @InsecureRoute() // This disables the default JWT auth, we use an auth based on the conference token here
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

    return ConferenceResource.make(appointment);
  }

  @InsecureRoute()
  @UseGuards(CommandGuard)
  @SubscribeMessage('switch-slide')
  async switchSlide(client: ConferenceClient): Promise<void> {
    const appointment = await Appointment.findOne(client.appointmentId);

    if (!appointment) {
      client.terminate();
      return;
    }
  }
}
