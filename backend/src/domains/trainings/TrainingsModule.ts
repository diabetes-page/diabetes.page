import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/Training.entity';
import { ShowAppointmentTraining } from './routes/showAppointmentTraining/ShowAppointmentTraining';
import { ShowTrainings } from './routes/showTrainings/ShowTrainings';
import { TrainingsService } from './services/TrainingsService';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [ShowTrainings, ShowAppointmentTraining],
  providers: [TrainingsService],
  exports: [TrainingsService],
})
export class TrainingsModule {}
