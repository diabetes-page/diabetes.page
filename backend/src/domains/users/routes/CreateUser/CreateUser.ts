import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';
import { ResourceController } from '../../../../bootstrap/blueprints/ResourceController';
import { JWTAuthGuard } from '../../../auth/guards/JWTAuthGuard';

@Controller()
export class CreateUser extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/users')
  @UseGuards(JWTAuthGuard)
  async serve(@Body() params: Parameters): Promise<Resource> {
    const user = await this.usersService.create(params.email);
    return Resource.make(user);
  }
}
