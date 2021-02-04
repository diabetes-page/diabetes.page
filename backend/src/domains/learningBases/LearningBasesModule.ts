import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningBase } from './entities/LearningBase.entity';
import { Topic } from './entities/Topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningBase, Topic])],
  controllers: [],
  providers: [],
  exports: [],
})
export class LearningBasesModule {}
