import { Controller, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { RequestUser } from '../../../blueprints/decorators/RequestUser';
import { User } from '../../users/entities/User.entity';
import { WebSocketAuth } from './WebSocketAuth';

@Controller()
@UseGuards(WebSocketAuth)
@WebSocketGateway({ path: '/conferences' })
export class ConferenceGateway {
  @WebSocketServer() server: WebSocket.Server;

  @SubscribeMessage('events')
  handleEvent(
    client: WebSocket,
    data: string,
    @RequestUser() user: User,
  ): void {
    this.server.clients.forEach((client) =>
      client.send(JSON.stringify({ newname: user.name })),
    );
  }
}
