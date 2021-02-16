import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConferenceGateway } from './gateways/ConferenceGateway';
import { ShowConferenceToken } from './routes/showConferenceToken/ShowConferenceToken';
import { SwitchConferenceSlide } from './routes/switchConferenceSlide/SwitchConferenceSlide';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jitsi.secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ShowConferenceToken, SwitchConferenceSlide],
  providers: [ConferenceGateway],
  exports: [],
})
export class ConferencesModule {}
