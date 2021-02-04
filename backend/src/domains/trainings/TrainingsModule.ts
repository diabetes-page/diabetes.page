import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Training} from "./entities/Training.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TrainingsModule {
}
