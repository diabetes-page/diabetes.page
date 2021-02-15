import { transform } from 'lodash';
import { IndexAppointments } from '../../screens/indexAppointments/IndexAppointments';
import { ShowConference } from '../../screens/showConference/ShowConference';
import { AppointmentsStack } from '../appDrawer/AppointmentsStack';

export const stacks = {
  appointments: {
    name: 'appointmentsStack',
    drawerLabel: 'Appointments' /* todo: i18n */,
    component: AppointmentsStack,
    screens: {
      index: {
        name: 'indexAppointments',
        url: 'appointments',
        component: IndexAppointments,
      },
      conference: {
        name: 'showConference',
        url: 'appointments/:id/conference',
        component: ShowConference,
      },
    },
  },
};

const screensConfig = transform(
  stacks,
  (newStacks: Record<string, any>, stack) =>
    (newStacks[stack.name] = {
      screens: transform(
        stack.screens,
        (newScreens: Record<string, any>, screen) =>
          (newScreens[screen.name] = screen.url),
        {},
      ),
    }),
  {},
);

export const linking = {
  prefixes: [],
  enabled: true,
  config: {
    screens: screensConfig,
  },
};
