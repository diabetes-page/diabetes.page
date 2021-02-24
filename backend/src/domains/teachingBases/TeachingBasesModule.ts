import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachingBase } from './entities/TeachingBase.entity';
import { Topic } from './entities/Topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeachingBase, Topic])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeachingBasesModule {}
