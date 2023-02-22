import { HydrateAction } from './global.types';

export const AUTHENTICATE = 'AUTHENTICATE';
export const DEAUTHENTICATE = 'DEAUTHENTICATE';

export interface AuthState {
  refresh: string | null;
  access: string | null;
  auth: boolean;
}

interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  payload: { access: string; refresh: string };
}

interface DeauthenticateAction {
  type: typeof DEAUTHENTICATE;
  payload: { access: null; refresh: null };
}

export type AuthActionTypes =
  | HydrateAction
  | AuthenticateAction
  | DeauthenticateAction;
