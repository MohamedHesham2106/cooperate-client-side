import { createWrapper, MakeStore } from 'next-redux-wrapper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { applyMiddleware, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { RootState } from './types/global.types';

const isOnProduction = process.env.NODE_ENV === 'production';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {} 
}

const bindMiddleware = (middleware: Array<Middleware>) => {
  if (!isOnProduction) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<RootState> = () =>
  createStore(rootReducer, bindMiddleware([thunk]));

export const wrapper = createWrapper<RootState>(makeStore, {
  debug: !isOnProduction,
});
