import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/Training.entity';
import { IndexTrainings } from './routes/indexTrainings/IndexTrainings';
import { ShowAppointmentTraining } from './routes/showAppointmentTraining/ShowAppointmentTraining';
import { TrainingsService } from './services/TrainingsService';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [IndexTrainings, ShowAppointmentTraining],
  providers: [TrainingsService],
  exports: [TrainingsService],
})
export class TrainingsModule {}
