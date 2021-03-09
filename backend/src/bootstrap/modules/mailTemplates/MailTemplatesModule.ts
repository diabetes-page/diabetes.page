import { Module } from '@nestjs/common';
import { MailTemplatesService } from './MailTemplatesService';

@Module({
  providers: [MailTemplatesService],
})
export class MailTemplatesModule {}
