import { Injectable } from '@nestjs/common';

@Injectable()
export class Seeder {
  async seed(): Promise<void> {
    console.log('Seeding...');
  }
}
