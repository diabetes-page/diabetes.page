import { Module } from '@nestjs/common';
import { GetUsers } from './routes/GetUsers/GetUsers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UsersService } from './services/UsersService';
import { CreateUser } from './routes/CreateUser/CreateUser';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetUsers, CreateUser],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
