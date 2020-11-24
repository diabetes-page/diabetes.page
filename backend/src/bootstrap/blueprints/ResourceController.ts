import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../../domains/auth/guards/JWTAuthGuard';
import { ClassType } from 'class-transformer/ClassTransformer';

@UseGuards(JWTAuthGuard)
export class ResourceController {
  public static Resource: ClassType<any>;
}
