// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { combineReducers } from 'redux';

import authenticationReducer from './authentication.reducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export default rootReducer;
