import { Body, Controller, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { AuthService } from '../../services/AuthService';
import { AuthenticationPipe } from './AuthenticationPipe';
import { User } from '../../../users/entities/User.entity';
import { ResourceController } from '../../../../bootstrap/blueprints/ResourceController';
import { Resource } from './Resource';

@Controller()
export class Login extends ResourceController {
  public static Resource = Resource;

  constructor(private authService: AuthService) {
    super();
  }

  @Post('/login')
  async login(
    @Body() params: Parameters,
    @Body(AuthenticationPipe) authenticatedUser: User,
  ): Promise<Resource> {
    const token = await this.authService.login(authenticatedUser);

    return Resource.make(token);
  }
}
