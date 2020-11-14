import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/Appointment.entity';
import { ShowConferenceToken } from './routes/showConferenceToken/ShowConferenceToken';
import { AppointmentsService } from './services/AppointmentsService';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [ShowConferenceToken],
  providers: [AppointmentsService],
  exports: [],
})
export class AppointmentsModule {}
