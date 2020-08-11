import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { ResourceController } from '../../../../bootstrap/blueprints/ResourceController';
import { Resource } from './Resource';
import { UsersService } from '../../../users/services/UsersService';

@Controller()
export class Register extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/register')
  async login(@Body() params: Parameters): Promise<Resource> {
    await this.usersService.create(params.email, params.password);
    // todo: use verification code, send email
    return Resource.make();
  }
}
