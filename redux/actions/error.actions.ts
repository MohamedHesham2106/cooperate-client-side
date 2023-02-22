import { Dispatch } from 'redux';

import { HIDE_ERROR, REMOVE_MESSAGE, SHOW_ERROR } from '../types/error.types';

export const showError = (message: string, severity: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: SHOW_ERROR, payload: { message, severity } });
  };
};

export const hideError = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: HIDE_ERROR });
    const removeMessageTimeout = setTimeout(() => {
      dispatch({ type: REMOVE_MESSAGE });
    }, 500);
    clearTimeout(removeMessageTimeout);
  };
};

export const removeMessage = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: REMOVE_MESSAGE });
  };
};

export default {
  showError,
  hideError,
  removeMessage,
};
