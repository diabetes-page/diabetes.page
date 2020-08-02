import { Module } from '@nestjs/common';
import { UsersModule } from '../users/UsersModule';
import { AuthService } from './services/AuthService';
import { Login } from './routes/Login';
import { LocalStrategy } from './strategies/LocalStrategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [Login],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
