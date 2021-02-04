import { Module } from '@nestjs/common';
import { AppointmentsModule } from '../../../domains/appointments/AppointmentsModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { LearningBasesModule } from '../../../domains/learningBases/LearningBasesModule';
import { TrainingsModule } from '../../../domains/trainings/TrainingsModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { ConfigModule } from '../config/ConfigModule';
import { TypeOrmModule } from '../typeOrm/TypeOrmModule';
import { ValidationModule } from '../validation/ValidationModule';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    ValidationModule,
    AuthModule,
    UsersModule,
    LearningBasesModule,
    TrainingsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
