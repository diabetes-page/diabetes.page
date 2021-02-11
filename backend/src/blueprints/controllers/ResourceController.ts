import { UseGuards } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import { JWTAuth } from '../guards/JWTAuth';

@UseGuards(JWTAuth)
export class ResourceController {
  public static Resource: ClassType<any>;
}
