import { Module } from '@nestjs/common';
import { ConfigModule } from '../../../bootstrap/modules/config/ConfigModule';
import { TypeOrmModule } from '../../../bootstrap/modules/typeOrm/TypeOrmModule';
import { Seeder } from '../Seeder';

@Module({
  imports: [ConfigModule, TypeOrmModule],
  providers: [Seeder],
})
export class SeederModule {}
