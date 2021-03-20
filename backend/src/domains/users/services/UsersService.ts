import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { MailTemplatesService } from '../../../bootstrap/modules/mailTemplates/MailTemplatesService';
import { User } from '../entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private readonly templatesService: MailTemplatesService,
    protected i18n: I18nService,
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

    const verificationToken = randomUUID();

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      verificationToken: verificationToken.toString(),
    }).save();

    await this.sendVerificationEmail(user);

    return user;
  }

  private async sendVerificationEmail(user: User): Promise<void> {
    await this.templatesService.sendMail({
      language: 'en', // todo: get language from user
      to: user.email,
      subject: user.name,
      template: __dirname + `/../templates/userVerificationEmail`,
      context: {
        name: user.name,
        verificationToken: user.verificationToken,
      },
    });
  }
}
