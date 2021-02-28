import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/Appointment.entity';
import { CreateAppointment } from './routes/createAppointment/CreateAppointment';
import { IndexAppointmentsForUser } from './routes/indexAppointmentsForUser/IndexAppointmentsForUser';
import { ShowAppointment } from './routes/showAppointment/ShowAppointment';
import { AppointmentsService } from './services/AppointmentsService';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [CreateAppointment, IndexAppointmentsForUser, ShowAppointment],
  providers: [AppointmentsService],
  exports: [],
})
export class AppointmentsModule {}
