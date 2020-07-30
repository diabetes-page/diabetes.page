import { Module } from '@nestjs/common';
import { GetUsers } from './routes/GetUsers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/User.entity';
import { UsersService } from './services/UsersService';
import { CreateUser } from './routes/CreateUser';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetUsers, CreateUser],
  providers: [UsersService],
})
export class UsersModule {}
