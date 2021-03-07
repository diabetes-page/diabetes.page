import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig = {
  transport: {
    host: process.env.MAILER_CONFIG_HOST,
    port: 1025,
    auth: {
      user: process.env.MAILER_CONFIG_USERNAME,
      pass: process.env.MAILER_CONFIG_PASSWORD,
    },
    secure: false, // upgrade later with STARTTLS
  },
  template: {
    dir: __dirname + '/../blueprints/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  options: {
    partials: {
      dir: __dirname + '/../blueprints/templates',
      options: {
        strict: true,
      },
    },
  },
  defaults: {
    from: 'no-reply@diabetes.page',
  },
};
