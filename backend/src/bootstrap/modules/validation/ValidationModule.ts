import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unique } from './validators/Unique';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot()],
  providers: [Unique],
})
export class ValidationModule {}
