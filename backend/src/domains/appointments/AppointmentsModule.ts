import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/Appointment.entity';
import { CreateAppointment } from './routes/createAppointment/CreateAppointment';
import { CreateAppointmentPreprocessor } from './routes/createAppointment/CreateAppointmentPreprocessor';
import { IndexConsultantAppointments } from './routes/indexConsultantAppointments/IndexConsultantAppointments';
import { IndexParticipantAppointments } from './routes/indexParticipantAppointments/IndexParticipantAppointments';
import { ShowAppointment } from './routes/showAppointment/ShowAppointment';
import { StartAppointment } from './routes/startAppointment/StartAppointment';
import { AppointmentsService } from './services/AppointmentsService';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [
    CreateAppointment,
    IndexParticipantAppointments,
    IndexConsultantAppointments,
    ShowAppointment,
    StartAppointment,
  ],
  providers: [AppointmentsService, CreateAppointmentPreprocessor],
  exports: [],
})
export class AppointmentsModule {}
