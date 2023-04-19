import { createContext } from 'react';

export interface IAuthContext {
  refreshToken: string;
  accessToken: string;
  uuid: string;
  Authenticate: (email: string, password: string) => void;
  SignOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
