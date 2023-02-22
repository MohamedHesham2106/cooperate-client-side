import { HYDRATE } from 'next-redux-wrapper';

import {
  ErrorActionTypes,
  ErrorState,
  HIDE_ERROR,
  REMOVE_MESSAGE,
  SHOW_ERROR,
} from '../types/error.types';

const initialState: ErrorState = {
  show: false,
  message: '',
  severity: 'error',
};

export default function errorReducer(
  state = initialState,
  action: ErrorActionTypes
) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.error };
    case SHOW_ERROR:
      return {
        ...state,
        show: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case HIDE_ERROR:
      return {
        ...state,
        show: false,
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
}
