import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/Appointment.entity';
import { CreateAppointment } from './routes/createAppointment/CreateAppointment';
import { IndexParticipantAppointments } from './routes/indexParticipantAppointments/IndexParticipantAppointments';
import { ShowAppointment } from './routes/showAppointment/ShowAppointment';
import { StartAppointment } from './routes/startAppointment/StartAppointment';
import { AppointmentsService } from './services/AppointmentsService';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [
    CreateAppointment,
    IndexParticipantAppointments,
    ShowAppointment,
    StartAppointment,
  ],
  providers: [AppointmentsService],
  exports: [],
})
export class AppointmentsModule {}
