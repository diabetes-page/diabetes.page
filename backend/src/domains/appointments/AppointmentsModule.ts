import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/Appointment.entity';
import { ShowConferenceToken } from './routes/showConferenceToken/ShowConferenceToken';
import { AppointmentsService } from './services/AppointmentsService';
import { CreateAppointment } from './routes/createAppointment/CreateAppointment';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConferenceService } from './services/ConferenceService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jitsi.secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CreateAppointment, ShowConferenceToken],
  providers: [AppointmentsService, ConferenceService],
  exports: [],
})
export class AppointmentsModule {}
