import { ExecutionContext, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { Appointment } from '../../../../appointments/entities/Appointment.entity';
import { ConferenceClient } from '../../../types/ConferenceClient';
import { ConferenceTokenPayload } from '../../../types/ConferenceTokenPayload';

type conferenceAuthData = { conferenceToken: string | undefined } | undefined;

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ws = context.switchToWs();
    const client: ConferenceClient | undefined = ws.getClient();
    const data: conferenceAuthData = ws.getData();

    if (!client || !data?.conferenceToken) {
      return LoginGuard.failAuthentication(client);
    }

    const [verificationResult, payload] = await this.verifyConferenceToken(
      data.conferenceToken,
    );

    if (!verificationResult || !payload) {
      return LoginGuard.failAuthentication(client);
    }

    const setAppointmentResult = await LoginGuard.setAppointment(
      client,
      payload,
    );

    if (!setAppointmentResult) {
      return LoginGuard.failAuthentication(client);
    }

    LoginGuard.awardRights(client, payload);

    return LoginGuard.allowAuthentication(client);
  }

  private async verifyConferenceToken(
    conferenceToken: string,
  ): Promise<[true, ConferenceTokenPayload] | [false, undefined]> {
    try {
      const payload = await this.jwtService.verifyAsync(conferenceToken);
      return [true, payload];
    } catch {
      return [false, undefined];
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

  private static awardRights(
    client: ConferenceClient,
    payload: ConferenceTokenPayload,
  ): void {
    client.canSendCommands = !!payload?.context?.user?.isConsultant;
  }

  private static async setAppointment(
    client: ConferenceClient,
    payload: ConferenceTokenPayload,
  ): Promise<boolean> {
    const appointmentId = payload?.context?.appointment?.id;

    if (typeof appointmentId === 'undefined') {
      return false;
    }

    const appointment = await Appointment.findOne(appointmentId);

    if (!appointment) {
      return false;
    }

    client.appointmentId = appointment.id;

    return true;
  }
}
