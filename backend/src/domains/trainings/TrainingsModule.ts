import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/Training.entity';
import { ShowAppointmentTraining } from './routes/showAppointmentTraining/ShowAppointmentTraining';
import { ShowTrainings } from './routes/showTrainings/ShowTrainings';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [ShowTrainings, ShowAppointmentTraining],
  providers: [],
  exports: [],
})
export class TrainingsModule {}
