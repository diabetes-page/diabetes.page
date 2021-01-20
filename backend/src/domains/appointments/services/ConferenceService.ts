import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as base64 from '@stablelib/base64';
import * as utf8 from '@stablelib/utf8';
import { getUnixTime } from 'date-fns';
import * as nacl from 'tweetnacl';
import { User } from '../../users/entities/User.entity';
import { Appointment } from '../entities/Appointment.entity';

@Injectable()
export class ConferenceService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createToken(appointment: Appointment, user: User): Promise<string> {
    return this.jwtService.sign({
      iss: this.configService.get<string>('jitsi.jwtIssuer'),
      sub: this.configService.get<string>('jitsi.jitsiDomain'),
      aud: this.configService.get<string>('jitsi.jitsiAppId'),
      exp: getUnixTime(appointment.endsAt), // exp is specified as Unix timestamp (seconds since epoch). See https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt
      room: appointment.conferenceRoom,
      context: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  }

  async createSwitchSlideMessage(
    appointment: Appointment,
    presentationIndex: number,
  ): Promise<string> {
    appointment.presentationIndex = presentationIndex;
    appointment.conferenceUpdateCounter += 1;
    await appointment.save();

    return this.createSignedJSONMessage(appointment.officialMessagePrivateKey, {
      presentationIndex: appointment.presentationIndex,
      conferenceUpdateCounter: appointment.conferenceUpdateCounter,
    });
  }

  private createSignedJSONMessage(
    officialMessagePrivateKey: string,
    record: Record<string, any>,
  ): string {
    const message = JSON.stringify(record);
    const messageArray = utf8.encode(message);
    const privateKey = base64.decode(officialMessagePrivateKey);
    const signedMessageArray = nacl.sign(messageArray, privateKey);
    const prepend = this.configService.get<string>(
      'conference.officialMessagePrepend',
    );

    return prepend + base64.encode(signedMessageArray);
  }
}
