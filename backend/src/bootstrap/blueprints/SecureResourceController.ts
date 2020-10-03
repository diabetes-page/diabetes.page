import { InsecureResourceController } from './InsecureResourceController';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../../domains/auth/guards/JWTAuthGuard';

@UseGuards(JWTAuthGuard)
export class SecureResourceController extends InsecureResourceController {}
