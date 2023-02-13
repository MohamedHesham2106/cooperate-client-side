import { HYDRATE } from 'next-redux-wrapper';

import { AuthState } from './authentication.types';

export type HydrateAction = {
  type: typeof HYDRATE;
  payload: RootState;
};

export type RootState = {
  authentication: AuthState;
};