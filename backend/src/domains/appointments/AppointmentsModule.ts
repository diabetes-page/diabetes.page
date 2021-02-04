import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/Appointment.entity';
import { UserAppointmentAssignment } from './entities/UserAppointmentAssignment.entity';
import { CreateAppointment } from './routes/createAppointment/CreateAppointment';
import { ShowConferenceData } from './routes/showConferenceData/ShowConferenceData';
import { SwitchConferenceSlide } from './routes/switchConferenceSlide/SwitchConferenceSlide';
import { AppointmentsService } from './services/AppointmentsService';
import { ConferenceService } from './services/ConferenceService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, UserAppointmentAssignment]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jitsi.secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CreateAppointment, ShowConferenceData, SwitchConferenceSlide],
  providers: [AppointmentsService, ConferenceService],
  exports: [],
})
export class AppointmentsModule {}
