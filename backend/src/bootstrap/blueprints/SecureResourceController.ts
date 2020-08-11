import { ResourceController } from './ResourceController';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../../domains/auth/guards/JWTAuthGuard';

@UseGuards(JWTAuthGuard)
export class SecureResourceController extends ResourceController {}
