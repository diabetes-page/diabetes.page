import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/Training.entity';
import { ShowAppointmentTraining } from './routes/showAppointmentTraining/ShowAppointmentTraining';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [ShowAppointmentTraining],
  providers: [],
  exports: [],
})
export class TrainingsModule {}
