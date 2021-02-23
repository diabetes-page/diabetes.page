import { Module } from '@nestjs/common';
import { AppointmentsModule } from '../../../domains/appointments/AppointmentsModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ConferencesModule } from '../../../domains/conferences/ConferencesModule';
import { LearningBasesModule } from '../../../domains/learningBases/LearningBasesModule';
import { TrainingsModule } from '../../../domains/trainings/TrainingsModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { WorkingGroupsModule } from '../../../domains/workingGroups/WorkingGroupsModule';
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
    ConferencesModule,
    WorkingGroupsModule,
  ],
})
export class AppModule {}
