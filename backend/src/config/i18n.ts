import { findEnvOrFail } from './utilities/findEnvOrFail';

export const i18nConfig = (): Record<string, any> => ({
  fallbackLanguage: findEnvOrFail('I18N_FALLBACK_LANGUAGE'),
});
