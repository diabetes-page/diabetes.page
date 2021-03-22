import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { addDays, getUnixTime } from 'date-fns';
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
    const training = await appointment.loadTraining();
    const lastIndex = training ? training.slides.length - 1 : 0;

    // Ensure 0 <= slideIndex <= lastIndex
    appointment.slideIndex = Math.min(Math.max(0, slideIndex), lastIndex);

    await appointment.save();
  }

  async createToken(appointment: Appointment, user: User): Promise<string> {
    const consultant = await user.loadAsConsultant();
    const payload: ConferenceTokenPayload = {
      iss: this.configService.get<string>('jitsi.jwtIssuer')!,
      sub: this.configService.get<string>('jitsi.jitsiDomain')!,
      aud: this.configService.get<string>('jitsi.jitsiAppId')!,
      exp: this.computeTokenExpiry(appointment),
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

  private computeTokenExpiry(appointment: Appointment): number {
    // Token expiry is specified as Unix timestamp (seconds since epoch).
    // See https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt
    const plannedEnd = getUnixTime(appointment.endsAt);
    const nextDay = getUnixTime(addDays(new Date(), 1)); // Grace period to make sure token remains valid

    return Math.max(plannedEnd, nextDay);
  }
}
