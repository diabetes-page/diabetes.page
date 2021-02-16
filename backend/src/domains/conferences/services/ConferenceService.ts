import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getUnixTime } from 'date-fns';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class ConferenceService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createToken(appointment: Appointment, user: User): Promise<string> {
    // todo: test if token expiry is enforced by Jitsi/ConferenceGateway
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
}
