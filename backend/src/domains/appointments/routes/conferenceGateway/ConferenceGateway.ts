import { Controller, UseGuards } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JWTAuth } from '../../../../blueprints/guards/JWTAuth';

@Controller()
@UseGuards(JWTAuth)
@WebSocketGateway(7348)
export class ConferenceGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    console.log('in');
  }
}
