import { SentMessageInfo, Transport } from 'nodemailer';
import MailMessage from 'nodemailer/lib/mailer/mail-message';

export type MockMail = {
  paragraphs: string[];
  subject: string;
  parameters: Record<any, any>;

  language: string;
  sender: string;
  recipient: string;
  template: string;

  raw: MailMessage;
};

class MockMailer {
  private mails: MockMail[] = [];

  reset(): void {
    this.mails = [];
  }

  registerMail(mail: MailMessage): void {
    this.mails.push({
      raw: mail,
      paragraphs: this.extractParagraphs(mail),
      subject: mail.data.subject!,
      parameters: (mail.data as any).context || {},
      language: (mail.data as any).language,
      sender: mail.data.from as string,
      recipient: mail.data.to as string,
      template: (mail.data as any).template,
    });
  }

  getSentMails(): MockMail[] {
    return this.mails;
  }

  getNodemailerTransport(): Transport {
    return {
      name: 'Mock',
      version: '1.0.0',
      send: (
        mail: MailMessage,
        callback: (err: Error | null, info: SentMessageInfo) => void,
      ): void => {
        this.registerMail(mail);
        callback(null, {});
      },
    };
  }

  private extractParagraphs(mail: MailMessage): string[] {
    return (mail.data.html as string)
      .replace(/(<([^>]+)>)/gi, '')
      .split(/\s*\n\s*/)
      .map((line) => line.trim())
      .filter((line) => !!line);
  }
}

export const mockMailer = new MockMailer();
