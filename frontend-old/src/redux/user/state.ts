import { SensitiveDataUserResource } from '../../utilities/requests/requests';

export type FilledUserState = SensitiveDataUserResource;

export type UserState = Record<string, never> | FilledUserState;
