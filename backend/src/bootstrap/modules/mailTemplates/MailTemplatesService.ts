import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions as NestISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

export type SendMailOptions = NestISendMailOptions & {
  language: string; // todo: make language an enum in user entity, share type definitions
  template: string;
};

@Injectable()
export class MailTemplatesService {
  private readonly fallbackLanguage: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.fallbackLanguage = configService.get<string>('i18n.fallbackLanguage');
  }

  public async sendMail(sendMailOptions: SendMailOptions): Promise<void> {
    const languageTemplate = await this.findLanguageTemplate(
      sendMailOptions,
    ).catch((err) => console.log(err)); // todo: proper logging

    if (!languageTemplate) {
      return;
    }

    this.mailerService
      .sendMail({
        ...sendMailOptions,
        template: languageTemplate,
      })
      .catch((err) => console.log(err)); // todo: proper logging
  }

  private async findLanguageTemplate({
    language,
    template,
  }: SendMailOptions): Promise<string> {
    const initialTemplate = template + '_' + language;

    if (await this.checkTemplateExists(initialTemplate)) {
      return initialTemplate;
    }

    const fallbackTemplate =
      this.fallbackLanguage && template + '_' + this.fallbackLanguage;

    if (
      fallbackTemplate &&
      (await this.checkTemplateExists(fallbackTemplate))
    ) {
      return fallbackTemplate;
    }

    throw new InternalServerErrorException(
      `Could not find language template for template ${template}, language ${language}, fallback ${this.fallbackLanguage}`,
    );
  }

  private async checkTemplateExists(
    languageTemplate: string,
  ): Promise<boolean> {
    const fileName = languageTemplate + '.hbs';

    return fs.promises
      .access(fileName)
      .then(() => true)
      .catch(() => false);
  }
}
