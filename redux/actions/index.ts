import authenticationActions from './authentication.actions';
import errorActions from './error.actions';

const actions = {
  ...authenticationActions,
  ...errorActions,
};

export default actions;
