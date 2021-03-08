import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/Training.entity';
import { ShowTraining } from './routes/showTraining/ShowTraining';
import { ShowTrainings } from './routes/showTrainings/ShowTrainings';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [ShowTraining, ShowTrainings],
  providers: [],
  exports: [],
})
export class TrainingsModule {}
