import { Module } from '@nestjs/common';
import { SeederModule } from '../../../database/seeding/bootstrap/SeederModule';
import { AppModule } from '../app/AppModule';

@Module({
  imports: [AppModule, SeederModule],
})
export class TestingModule {}
