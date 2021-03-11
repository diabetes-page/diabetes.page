import { I18nJsonParser, I18nModule as I18nModuleBase } from 'nestjs-i18n';
import * as path from 'path';

export const I18nModule = I18nModuleBase.forRoot({
  fallbackLanguage: 'en',
  parser: I18nJsonParser,
  parserOptions: {
    path: path.join(__dirname, '../../../resources/i18n/'),
  },
});
