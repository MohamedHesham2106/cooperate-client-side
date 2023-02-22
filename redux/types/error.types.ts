import { HydrateAction } from './global.types';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export interface ErrorState {
  show: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

interface ShowErrorAction {
  type: typeof SHOW_ERROR;
  payload: { message: string; severity: string };
}

interface HideErrorAction {
  type: typeof HIDE_ERROR;
}

interface UpdateMessageAction {
  type: typeof REMOVE_MESSAGE;
}

export type ErrorActionTypes =
  | HydrateAction
  | ShowErrorAction
  | HideErrorAction
  | UpdateMessageAction;
