import { HydrateAction } from './global.types';

export const AUTHENTICATE = 'AUTHENTICATE';
export const DEAUTHENTICATE = 'DEAUTHENTICATE';

export interface AuthState {
  // user: User | null;
  refresh: string | null;
  access: string | null;
  auth: boolean;
}

interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  //payload: { user: User; access: string; refresh: string };
  payload: { access: string; refresh: string };
}

interface DeauthenticateAction {
  type: typeof DEAUTHENTICATE;
}

export type AuthActionTypes =
  | HydrateAction
  | AuthenticateAction
  | DeauthenticateAction;
