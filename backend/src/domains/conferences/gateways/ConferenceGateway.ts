import { Controller, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { ConferenceAuth } from './ConferenceAuth';

@Controller()
@WebSocketGateway({ path: '/conferences' })
export class ConferenceGateway {
  @WebSocketServer() server: WebSocket.Server;

  @UseGuards(ConferenceAuth)
  @SubscribeMessage('authenticate')
  handleEvent(client: WebSocket): Record<string, any> {
    return {
      test: true,
    };
  }
}
