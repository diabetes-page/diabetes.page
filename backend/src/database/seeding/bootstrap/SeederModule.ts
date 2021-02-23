import { Module } from '@nestjs/common';
import { ConfigModule } from '../../../bootstrap/modules/config/ConfigModule';
import { TypeOrmModule } from '../../../bootstrap/modules/typeOrm/TypeOrmModule';
import { AppointmentFactory } from '../../factories/AppointmentFactory';
import { LearningBaseFactory } from '../../factories/LearningBaseFactory';
import { TrainingFactory } from '../../factories/TrainingFactory';
import { UserFactory } from '../../factories/UserFactory';
import { WorkingGroupFactory } from '../../factories/WorkingGroupFactory';
import { MainSeeder } from '../MainSeeder';

@Module({
  imports: [ConfigModule, TypeOrmModule],
  providers: [
    MainSeeder,
    UserFactory,
    LearningBaseFactory,
    TrainingFactory,
    AppointmentFactory,
    WorkingGroupFactory,
  ],
})
export class SeederModule {}
