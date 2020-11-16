import { Module } from '@nestjs/common';
import { UsersModule } from '../users/UsersModule';
import { AuthService } from './services/AuthService';
import { Login } from './routes/login/Login';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/JWTStrategy';
import { Register } from './routes/register/Register';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('security.secretKey'),
        signOptions: {
          expiresIn: configService.get<string>('security.tokenExpiry'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [Login, Register],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
