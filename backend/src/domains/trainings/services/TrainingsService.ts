import { Injectable } from '@nestjs/common';
import { Consultant } from '../../users/entities/Consultant.entity';
import { Training } from '../entities/Training.entity';

@Injectable()
export class TrainingsService {
  async getTrainingsForConsultant(consultant: Consultant): Promise<Training[]> {
    return await Training.find({
      where: {
        creator: consultant,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
