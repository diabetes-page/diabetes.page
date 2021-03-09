import { Global, Module } from '@nestjs/common';
import { MailTemplatesService } from './MailTemplatesService';

@Global()
@Module({
  providers: [MailTemplatesService],
})
export class MailTemplatesModule {}
