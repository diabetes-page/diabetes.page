import { Module } from '@nestjs/common';
import { UsersModule } from '../users/UsersModule';
import { AuthService } from './services/AuthService';
import { Login } from './routes/Login';
import { LocalStrategy } from './strategies/LocalStrategy';

@Module({
  imports: [UsersModule],
  controllers: [Login],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
