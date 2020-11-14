import { Controller, Get } from '@nestjs/common';
import { SecureResourceController } from '../../../../bootstrap/blueprints/SecureResourceController';
import { Resource } from './Resource';

@Controller()
export class ShowConferenceToken extends SecureResourceController {
  public static Resource = Resource;

  // todo: role-based protection
  @Get('/appointments/:id/conference-token')
  async serve(): Promise<Resource> {
    return { conferenceToken: '' };
  }
}
