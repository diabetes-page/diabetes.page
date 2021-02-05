import { Module } from '@nestjs/common';
import { ConfigModule } from '../../../bootstrap/modules/config/ConfigModule';
import { TypeOrmModule } from '../../../bootstrap/modules/typeOrm/TypeOrmModule';
import { UserFactory } from '../../factories/UserFactory';
import { MainSeeder } from '../MainSeeder';

@Module({
  imports: [ConfigModule, TypeOrmModule],
  providers: [MainSeeder, UserFactory],
})
export class SeederModule {}
