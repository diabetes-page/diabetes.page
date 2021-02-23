import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingGroup } from './entities/WorkingGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingGroup])],
  controllers: [],
  providers: [],
  exports: [],
})
export class WorkingGroupsModule {}
