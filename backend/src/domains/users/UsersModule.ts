import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { IndexUsers } from './routes/indexUsers/IndexUsers';
import { UsersService } from './services/UsersService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [IndexUsers],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
