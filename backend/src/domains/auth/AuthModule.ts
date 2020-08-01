import { Module } from '@nestjs/common';
import { UsersModule } from '../users/UsersModule';
import { AuthService } from './services/AuthService';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
