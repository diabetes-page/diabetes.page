import { NestFactory } from '@nestjs/core';
import { MainSeeder } from '../MainSeeder';
import { SeederModule } from './SeederModule';

async function bootstrap(): Promise<void> {
  NestFactory.createApplicationContext(SeederModule).then((appContext) => {
    const seeder = appContext.get(MainSeeder);
    seeder
      .seed()
      .then(() => {
        console.log('Seeding complete!');
      })
      .catch((error) => {
        console.log('Seeding failed!');
        throw error;
      })
      .finally(() => appContext.close());
  });
}
bootstrap();
