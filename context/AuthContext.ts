/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export interface IAuthContext {
  refreshToken: string;
  accessToken: string;
  uuid: string;
  Authenticate: (email: string, password: string) => void;
  SignOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  refreshToken: '',
  accessToken: '',
  uuid: '',
  Authenticate() {},
  SignOut() {},
});
