import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/UsersModule';
import { Login } from './routes/login/Login';
import { Register } from './routes/register/Register';
import { AuthService } from './services/AuthService';
import { JWTStrategy } from './strategies/JWTStrategy';

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
