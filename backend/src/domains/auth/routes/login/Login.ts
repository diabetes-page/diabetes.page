import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { InsecureRoute } from '../../../../blueprints/decorators/InsecureRoute';
import { AuthService } from '../../services/AuthService';
import { LoginPreprocessor } from './LoginPreprocessor';
import { Parameters } from './Parameters';
import { Resource } from './Resource';

@Controller()
export class Login extends ResourceController {
  public static Resource = Resource;

  constructor(
    private authService: AuthService,
    private preprocessor: LoginPreprocessor,
  ) {
    super();
  }

  @InsecureRoute()
  @HttpCode(HttpStatus.OK)
  @Post('/auth/login')
  async login(@Body() params: Parameters): Promise<Resource> {
    const authenticatedUser = await this.preprocessor.process(params);
    const token = await this.authService.login(authenticatedUser);

    return Resource.make(token, authenticatedUser);
  }
}
