import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConferenceGateway } from './gateways/conferenceGateway/ConferenceGateway';
import { ShowConferenceToken } from './routes/showConferenceToken/ShowConferenceToken';
import { ConferencesService } from './services/ConferencesService';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jitsi.secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ShowConferenceToken],
  providers: [ConferencesService, ConferenceGateway],
  exports: [],
})
export class ConferencesModule {}
