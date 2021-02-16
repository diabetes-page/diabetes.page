import { ExecutionContext, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConferenceClient } from '../types/ConferenceClient';

type conferenceAuthData = { conferenceToken: string | undefined } | undefined;

@Injectable()
export class ConferenceAuth implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ws = context.switchToWs();
    const client: ConferenceClient | undefined = ws.getClient();
    const data: conferenceAuthData = ws.getData();

    if (!client || !data || !data.conferenceToken) {
      return ConferenceAuth.failAuthentication(client);
    }

    const verificationResult = await this.getVerificationResult(
      data.conferenceToken,
    );

    if (!verificationResult) {
      return ConferenceAuth.failAuthentication(client);
    }

    return ConferenceAuth.allowAuthentication(client);
  }

  private async getVerificationResult(
    conferenceToken: string,
  ): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(conferenceToken);
      return true;
    } catch {
      return false;
    }
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
