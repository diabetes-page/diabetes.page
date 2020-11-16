import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Appointment } from '../entities/Appointment.entity';
import { JwtService } from '@nestjs/jwt';
import { getUnixTime } from 'date-fns';

@Injectable()
export class ConferenceService {
  constructor(
    @Inject('TEST') private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createToken(appointment: Appointment): Promise<string> {
    console.log(this.jwtService);
    // @ts-ignore
    console.log(this.jwtService.getSecretKey());
    return this.jwtService.sign({
      iss: this.configService.get<string>('jitsi.jwtIssuer'),
      sub: this.configService.get<string>('jitsi.jitsiDomain'),
      aud: this.configService.get<string>('jitsi.jitsiAppId'),
      exp: getUnixTime(appointment.endsAt), // exp is specified as Unix timestamp (seconds since epoch). See https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt
      room: appointment.conferenceRoom,
    });
  }
}
