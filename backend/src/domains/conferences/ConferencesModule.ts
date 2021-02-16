import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConferenceGateway } from './gateways/ConferenceGateway';
import { ShowConferenceData } from './routes/showConferenceData/ShowConferenceData';
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
  controllers: [ShowConferenceData, SwitchConferenceSlide],
  providers: [ConferenceGateway],
  exports: [],
})
export class ConferencesModule {}
