import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const INSECURE_ROUTE_METADATA_KEY = 'isPublic';
export const InsecureRoute = (): CustomDecorator =>
  SetMetadata(INSECURE_ROUTE_METADATA_KEY, true);
