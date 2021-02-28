import { ExecutionContext, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import { ConferenceClient } from '../../../types/ConferenceClient';
@Injectable()
export class CommandGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ws = context.switchToWs();
    const client: ConferenceClient | undefined = ws.getClient();

    if (!client || !client.isAuthenticated || !client.canSendCommands) {
      return CommandGuard.failAuthorization(client);
    }

    return true;
  }

  private static failAuthorization(
    client: ConferenceClient | undefined,
  ): boolean {
    if (client) {
      client.terminate();
    }
    return false;
  }
}
