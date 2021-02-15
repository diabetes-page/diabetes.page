import { Controller, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { JWTAuth } from '../../../../blueprints/guards/JWTAuth';

@Controller()
@UseGuards(JWTAuth) // Todo: Check that this actually works
@WebSocketGateway({ path: '/xyz' })
export class ConferenceGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
