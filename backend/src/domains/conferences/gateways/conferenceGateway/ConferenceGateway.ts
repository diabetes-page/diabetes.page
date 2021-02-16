import { Controller, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { ConferenceResource } from '../../resources/ConferenceResource';
import { ConferenceClient } from '../../types/ConferenceClient';
import { ConferenceAuth } from './ConferenceAuth';

@Controller()
@WebSocketGateway({ path: '/conferences' })
export class ConferenceGateway {
  @WebSocketServer() server: WebSocket.Server;

  @UseGuards(ConferenceAuth)
  @SubscribeMessage('authenticate')
  async handleEvent(
    client: ConferenceClient,
  ): Promise<ConferenceResource | Record<string, never>> {
    console.log(client);
    const appointment = await Appointment.findOne(client.appointmentId);

    if (!appointment) {
      return {};
    }

    // Todo: This does not work correctly, the ResourceInterceptor is not being applied
    return ConferenceResource.make(appointment);
  }
}
