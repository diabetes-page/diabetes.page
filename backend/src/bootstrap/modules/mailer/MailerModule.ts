import { MailerModule as MailerModuleBase } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { mockMailer } from '../../../test/utilities/MockMailer';

export const MailerModule = MailerModuleBase.forRootAsync({
  // This must be an async module in order to load the env properly, especially when env is set during testing
  useFactory: async (configService: ConfigService) => {
    const mockTransport =
      configService.get<boolean>('environment.isTesting') &&
      mockMailer.getNodemailerTransport();

    return {
      transport: mockTransport || {
        host: configService.get<string>('mailer.host'),
        port: configService.get<number>('mailer.port'),
        auth: {
          user: configService.get<string>('mailer.username'),
          pass: configService.get<string>('mailer.password'),
        },
        secure: true,
      },
      defaults: {
        from: configService.get<string>('mailer.mailFrom'),
      },
      template: {
        dir: __dirname + '../../../blueprints/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: __dirname + '/../../../blueprints/templates',
        },
      },
    };
  },
  inject: [ConfigService],
});
