import { Module } from '@nestjs/common';
import { AppointmentsModule } from '../../../domains/appointments/AppointmentsModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ConferencesModule } from '../../../domains/conferences/ConferencesModule';
import { TeachingBasesModule } from '../../../domains/teachingBases/TeachingBasesModule';
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
    TeachingBasesModule,
    TrainingsModule,
    AppointmentsModule,
    ConferencesModule,
    WorkingGroupsModule,
  ],
})
export class AppModule {}
