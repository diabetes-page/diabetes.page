import { Module } from '@nestjs/common';
import { GetUsers } from './routes/GetUsers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetUsers],
})
export class UsersModule {}
