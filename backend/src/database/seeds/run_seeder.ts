import { NestFactory } from '@nestjs/core';
import { SeederModule } from './SeederModule';
import { Seeder } from './Seeder';

function bootstrap(): void {
  NestFactory.createApplicationContext(SeederModule).then((appContext) => {
    const seeder = appContext.get(Seeder);
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
