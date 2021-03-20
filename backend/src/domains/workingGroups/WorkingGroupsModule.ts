import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingGroup } from './entities/WorkingGroup.entity';
import { IndexWorkingGroups } from './routes/indexWorkingGroups/IndexWorkingGroups';
import { WorkingGroupsService } from './services/WorkingGroupsService';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingGroup])],
  controllers: [IndexWorkingGroups],
  providers: [WorkingGroupsService],
  exports: [WorkingGroupsService],
})
export class WorkingGroupsModule {}
