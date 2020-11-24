import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { Resource } from './Resource';
import { UsersService } from '../../../users/services/UsersService';
import { ResourceController } from '../../../../bootstrap/blueprints/ResourceController';
import { InsecureRoute } from '../../../../bootstrap/blueprints/decorators/InsecureRoute';

@Controller()
export class Register extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @InsecureRoute()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/register')
  async login(@Body() params: Parameters): Promise<Resource> {
    await this.usersService.add(params.email, params.password);
    // todo: use verification code, send email
    return Resource.make();
  }
}
