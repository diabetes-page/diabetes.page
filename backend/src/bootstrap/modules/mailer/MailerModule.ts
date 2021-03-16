import { MailerModule as MailerModuleBase } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const MailerModule = MailerModuleBase.forRootAsync({
  // This must be an async module in order to load the env properly, especially when env is set during testing
  useFactory: async (configService: ConfigService) => {
    return {
      transport: {
        host: configService.get<string>('mailer.host'),
        port: configService.get<number>('mailer.port'),
        auth: {
          user: configService.get<string>('mailer.username'),
          pass: configService.get<string>('mailer.password'),
        },
        secure: false, // todo: upgrade later with STARTTLS
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
      // preview: {
      //   dir: '/home/tom/projects/diabetes.page/backend',
      // },
    };
  },
  inject: [ConfigService],
});
