import { ConfigService } from '@nestjs/config';
import { I18nJsonParser, I18nModule as I18nModuleBase } from 'nestjs-i18n';
import * as path from 'path';

export const I18nModule = I18nModuleBase.forRootAsync({
  useFactory: async (configService: ConfigService) => {
    return {
      fallbackLanguage: configService.get<string>('i18n.fallbackLanguage')!,
      parserOptions: {
        path: path.join(__dirname, '../../../resources/i18n/'),
      },
    };
  },
  parser: I18nJsonParser,
  inject: [ConfigService],
});
