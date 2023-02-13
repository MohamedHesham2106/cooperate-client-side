import { HYDRATE } from 'next-redux-wrapper';

import {
  AuthActionTypes,
  AUTHENTICATE,
  AuthState,
  DEAUTHENTICATE,
} from '../types/authentication.types';

const initialState: AuthState = {
  access: null,
  refresh: null,
  auth: false,
};

export default function authReducer(
  state = initialState,
  action: AuthActionTypes
) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.authentication };
    case AUTHENTICATE:
      return {
        ...state,
        refresh: action.payload.refresh,
        access: action.payload.access,
        auth: true,
      };
    case DEAUTHENTICATE:
      return {
        ...state,
        access: null,
        refresh: null,
        auth: false,
      };
    default:
      return state;
  }
}
