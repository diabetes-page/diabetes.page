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
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
};
