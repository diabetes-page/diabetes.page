import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as crypto from 'crypto';
import { User } from '../entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async get(id: string): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  async all(): Promise<User[]> {
    return User.find();
  }

  async where(fields: Partial<User>): Promise<User[]> {
    return User.find({ where: fields });
  }

  async oneWhere(fields: Partial<User>): Promise<User | undefined> {
    return User.findOne({ where: fields });
  }

  async add(
    name: string,
    email: string,
    cleartextPassword: string | null = null,
  ): Promise<User> {
    const passwordHash = cleartextPassword
      ? await hash(
          cleartextPassword,
          this.configService.get<number>('security.bcryptSaltRounds', 10),
        )
      : cleartextPassword;

    const verificationToken = crypto.randomInt(1000);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      verificationToken: verificationToken.toString(),
    }).save();

    this.sendVerificationEmail(user);
    return user;
  }

  private sendVerificationEmail(user: User): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'no-reply@diabetes.page',
        subject: user.name,
        template: __dirname + '/../templates/userVerificationEmail',
        context: {
          user: user,
        },
      })
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  }
}
