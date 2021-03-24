import { BadRequestException, Injectable } from '@nestjs/common';
import { isBefore, parseISO } from 'date-fns';
import { I18nService } from 'nestjs-i18n';
import { Training } from '../../../trainings/entities/Training.entity';
import { WorkingGroup } from '../../../workingGroups/entities/WorkingGroup.entity';
import { Parameters } from './Parameters';

export type CreateAppointmentData = {
  startsAt: Date;
  endsAt: Date;
  training: Training | null;
  workingGroup: WorkingGroup;
};

@Injectable()
export class CreateAppointmentPreprocessor {
  constructor(protected i18n: I18nService) {}

  async process(params: Parameters): Promise<CreateAppointmentData> {
    const [startsAt, endsAt] = [
      parseISO(params.startsAt),
      parseISO(params.endsAt),
    ];

    if (!isBefore(startsAt, endsAt)) {
      throw new BadRequestException(
        await this.i18n.translate(
          'validation.CREATE_APPOINTMENT_DATES_ERROR_MESSAGE',
        ),
      );
    }

    const training = params.trainingId
      ? (await Training.findOne(params.trainingId))!
      : null;
    const workingGroup = (await WorkingGroup.findOne(params.workingGroupId))!;

    return {
      startsAt,
      endsAt,
      training,
      workingGroup,
    };
  }
}
