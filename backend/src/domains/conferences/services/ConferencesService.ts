import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getUnixTime } from 'date-fns';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { User } from '../../users/entities/User.entity';
import { ConferenceTokenPayload } from '../types/ConferenceTokenPayload';

@Injectable()
export class ConferencesService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async switchSlide(
    appointment: Appointment,
    slideIndex: number,
  ): Promise<void> {
    // Make sure slideIndex is always a valid index in training.slide
    const training = await appointment.loadTraining();
    const mod = training ? training.slides.length : 1;
    // Same as regular modulo, but guarantess non-negative result
    appointment.slideIndex = (mod + (slideIndex % mod)) % mod;

    await appointment.save();
  }

  async createToken(appointment: Appointment, user: User): Promise<string> {
    const consultant = await user.loadAsConsultant();
    const payload: ConferenceTokenPayload = {
      iss: this.configService.get<string>('jitsi.jwtIssuer')!,
      sub: this.configService.get<string>('jitsi.jitsiDomain')!,
      aud: this.configService.get<string>('jitsi.jitsiAppId')!,
      // Todo: We have to decide if we want appointments to expire immediately at "endsAt". Many appointments will go longer accidentally. We should add a grace period.
      // exp is specified as Unix timestamp (seconds since epoch). See https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt
      exp: getUnixTime(appointment.endsAt),
      room: appointment.conferenceRoom,
      context: {
        user: {
          name: user.name,
          email: user.email,
          isConsultant: !!consultant,
        },
        appointment: {
          id: appointment.id,
        },
      },
    };

    // todo: test if token expiry is enforced by Jitsi/ConferenceGateway
    return this.jwtService.signAsync(payload);
  }
}
