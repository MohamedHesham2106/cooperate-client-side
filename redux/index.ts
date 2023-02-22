import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import rootReducer from './reducers';
import { RootState } from './types/global.types';

const isOnProduction = process.env.NODE_ENV === 'production';

const bindMiddleware = (middleware: Array<Middleware>) => {
  if (!isOnProduction) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<Store<RootState>> = () =>
  createStore(
    rootReducer,
    bindMiddleware([thunk as ThunkMiddleware<RootState>])
  );

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: !isOnProduction,
});

// You can export your custom `wrapper` and `RootState` types as well
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
