import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Consultant } from '../../entities/Consultant.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';
import { UsersService } from '../../services/UsersService';
import { Parameters } from './Parameters';

@Controller()
export class CreateUser extends ResourceController {
  public static Resource = SensitiveDataUserResource;

  constructor(private usersService: UsersService) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.CREATED)
  @Post('/users/create')
  async serve(@Body() params: Parameters): Promise<SensitiveDataUserResource> {
    return this.usersService.add(params.name, params.email, params.password);
  }
}
