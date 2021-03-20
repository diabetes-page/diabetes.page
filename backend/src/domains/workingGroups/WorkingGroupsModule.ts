import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingGroup } from './entities/WorkingGroup.entity';
import { ShowWorkingGroups } from './routes/showWorkingGroups/ShowWorkingGroups';
import { WorkingGroupsService } from './services/WorkingGroupsService';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingGroup])],
  controllers: [ShowWorkingGroups],
  providers: [WorkingGroupsService],
  exports: [WorkingGroupsService],
})
export class WorkingGroupsModule {}
