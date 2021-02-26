import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/Training.entity';
import { ShowTraining } from './routes/showTraining/ShowTraining';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [ShowTraining],
  providers: [],
  exports: [],
})
export class TrainingsModule {}
