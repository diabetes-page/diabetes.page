import { Controller, Get } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Resource } from './Resource';

@Controller()
export class CheckAuthStatus extends ResourceController {
  public static Resource = Resource;

  @Get('/auth/status')
  async serve(): Promise<Resource> {
    return Resource.make();
  }
}
