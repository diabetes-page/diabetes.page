import { ExecutionContext, Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { JWTAuth } from '../../../../blueprints/guards/JWTAuth';

@Injectable()
export class WebSocketAuth extends JWTAuth {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ws = context.switchToWs();

    if (!request.headers) {
      request.headers = {};
    }

    // For Web Socket requests, it's difficult/impossible to send headers
    // So the authorization is sent as part of the payload
    // We manually create a headers object and add the authorization
    // Compare https://stackoverflow.com/questions/4361173/http-headers-in-websockets-client-api
    // And https://stackoverflow.com/questions/58670553/nestjs-gateway-websocket-how-to-send-jwt-access-token-through-socket-emit
    request.headers.authorization = ws.getData()?.authorization;

    let canActivate;

    try {
      canActivate = await super.canActivate(context);
    } catch {
      const client: WebSocket = ws.getClient();
      client?.terminate();
    }

    return typeof canActivate === 'boolean' ? canActivate : false;
  }
}
