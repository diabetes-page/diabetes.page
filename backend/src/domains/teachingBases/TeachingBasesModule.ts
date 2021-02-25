import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachingBase } from './entities/TeachingBase.entity';
import { TeachingBaseDocument } from './entities/TeachingBaseDocument.entity';
import { Topic } from './entities/Topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeachingBase, Topic, TeachingBaseDocument]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeachingBasesModule {}
