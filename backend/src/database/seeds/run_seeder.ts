import { NestFactory } from '@nestjs/core';
import { Seeder } from './Seeder';
import { SeederModule } from './SeederModule';

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
