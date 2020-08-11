import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';
import {ResourceController} from "../../../../bootstrap/blueprints/ResourceController";

@Controller()
export class CreateUser extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/users')
  async serve(@Body() params: Parameters): Promise<Resource> {
    const user = await this.usersService.create(params.email);
    return Resource.make(user);
  }
}
