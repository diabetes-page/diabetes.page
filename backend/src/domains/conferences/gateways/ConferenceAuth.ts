import { ExecutionContext, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConferenceClient } from '../types/ConferenceClient';

@Injectable()
export class ConferenceAuth implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ws = context.switchToWs();
    const client: ConferenceClient | undefined = ws.getClient();
    const data:
      | { conferenceToken: string | undefined }
      | undefined = ws.getData();

    if (!client || !data || !data.conferenceToken) {
      return ConferenceAuth.failAuthentication(client);
    }

    const verificationResult = await this.jwtService.verifyAsync(
      data.conferenceToken,
    );

    if (!verificationResult) {
      return ConferenceAuth.failAuthentication(client);
    }

    return ConferenceAuth.allowAuthentication(client);
  }

  private static failAuthentication(
    client: ConferenceClient | undefined,
  ): boolean {
    if (client) {
      client.terminate();
    }
    return false;
  }

  private static allowAuthentication(client: ConferenceClient): boolean {
    client.isAuthenticated = true;
    return true;
  }
}
