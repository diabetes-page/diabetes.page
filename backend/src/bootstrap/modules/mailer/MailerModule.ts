import { MailerModule as MailerModuleBase } from '@nestjs-modules/mailer';

export const MailerModule = MailerModuleBase.forRootAsync({
  // This must be an async module in order to load the env properly, especially when env is set during testing
  useFactory: async () => {
    return {
      transport: {
        host: process.env.MAILER_CONFIG_HOST,
        port: 1025, // todo: put this into env
        auth: {
          user: process.env.MAILER_CONFIG_USERNAME,
          pass: process.env.MAILER_CONFIG_PASSWORD,
        },
        secure: false, // todo: upgrade later with STARTTLS
      },
      defaults: {
        from: 'no-reply@diabetes.page',
      },
    };
  },
});
