import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions as NestISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type SendMailOptions = NestISendMailOptions & {
  language: string; // todo: make language an enum in user entity, share type definitions
};

@Injectable()
export class MailTemplatesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  public async sendMail(sendMailOptions: SendMailOptions): Promise<void> {
    this.mailerService
      .sendMail(sendMailOptions)
      .catch((err) => console.log(err)); // todo: proper logging
  }
}
