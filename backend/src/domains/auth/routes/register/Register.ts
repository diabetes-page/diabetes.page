import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { InsecureRoute } from '../../../../blueprints/decorators/InsecureRoute';
import { UsersService } from '../../../users/services/UsersService';
import { Parameters } from './Parameters';
import { Resource } from './Resource';

@Controller()
export class Register extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @InsecureRoute()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/auth/register')
  async login(@Body() params: Parameters): Promise<Resource> {
    await this.usersService.add(params.name, params.email, params.password);
    // todo: use verification code, send email
    return Resource.make();
  }
}
