import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/UsersModule';
import { CheckAuthStatus } from './routes/checkAuthStatus/CheckAuthStatus';
import { Login } from './routes/login/Login';
import { LoginPreprocessor } from './routes/login/LoginPreprocessor';
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
  controllers: [Login, CheckAuthStatus],
  providers: [AuthService, JWTStrategy, LoginPreprocessor],
})
export class AuthModule {}
