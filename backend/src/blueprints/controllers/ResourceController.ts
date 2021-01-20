import { UseGuards } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import { JWTAuthGuard } from '../../domains/auth/guards/JWTAuthGuard';

@UseGuards(JWTAuthGuard)
export class ResourceController {
  public static Resource: ClassType<any>;
}
