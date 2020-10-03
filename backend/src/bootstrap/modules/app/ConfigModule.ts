import { ConfigModule as ConfigModuleBase } from '@nestjs/config';
import { config } from '../../../config';

export const ConfigModule = ConfigModuleBase.forRoot({
  load: [config],
  isGlobal: true,
});
