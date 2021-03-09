import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from './entities/Consultant.entity';
import { Manager } from './entities/Manager.entity';
import { User } from './entities/User.entity';
import { CreateUser } from './routes/createUser/CreateUser';
import { IndexUsers } from './routes/indexUsers/IndexUsers';
import { ShowUser } from './routes/showUser/ShowUser';
import { UsersService } from './services/UsersService';

@Module({
  imports: [TypeOrmModule.forFeature([User, Consultant, Manager])],
  controllers: [IndexUsers, ShowUser, CreateUser],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
