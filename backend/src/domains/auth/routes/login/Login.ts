import { Body, Controller, Post } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { InsecureRoute } from '../../../../blueprints/decorators/InsecureRoute';
import { User } from '../../../users/entities/User.entity';
import { AuthService } from '../../services/AuthService';
import { AuthenticationPipe } from './AuthenticationPipe';
import { Parameters } from './Parameters';
import { Resource } from './Resource';

@Controller()
export class Login extends ResourceController {
  public static Resource = Resource;

  constructor(private authService: AuthService) {
    super();
  }

  @InsecureRoute()
  @Post('/login')
  async login(
    @Body() params: Parameters,
    @Body(AuthenticationPipe) authenticatedUser: User,
  ): Promise<Resource> {
    const token = await this.authService.login(authenticatedUser);

    return Resource.make(token);
  }
}
