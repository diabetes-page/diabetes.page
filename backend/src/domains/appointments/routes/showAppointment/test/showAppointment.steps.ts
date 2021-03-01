import { Given, TableDefinition } from 'cucumber';
import { parseISO } from 'date-fns';
import { seeder } from '../../../../../test/setup.steps';
import { Training } from '../../../../trainings/entities/Training.entity';
import { User } from '../../../../users/entities/User.entity';

Given(
  /^the training "([^"]*)" has an appointment with the following configuration:$/,
  async function (trainingName, configuration: TableDefinition<any>) {
    const dataHash = configuration.rowsHash();
    const training = (await Training.findOne({ name: trainingName }))!;
    const presenter = (await (await User.findOne({
      name: dataHash.Presenter,
    }))!.loadAsConsultant())!;

    await seeder.appointmentFactory.createAppointment(training, presenter, {
      startsAt: parseISO(dataHash['Start time']),
      endsAt: parseISO(dataHash['End time']),
    });
  },
);
