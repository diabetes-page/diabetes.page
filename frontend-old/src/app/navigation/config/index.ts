import { transform } from 'lodash';
import { AppointmentsStack } from '../appDrawer/AppointmentsStack';

export const stacks = {
  appointments: AppointmentsStack,
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
