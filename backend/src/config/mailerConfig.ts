import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig = {
  transport: {
    host: 'localhost',
    port: 1025,
    secure: false, // upgrade later with STARTTLS
    // auth: {
    //   user: 'username',
    //   pass: 'password',
    // },
  },
  template: {
    dir: __dirname,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  // options: {
  //   partials: {
  //     dir: path.join(process.env.PWD, 'templates/partials'),
  //     options: {
  //       strict: true,
  //     },
  //   },
  // },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
};
