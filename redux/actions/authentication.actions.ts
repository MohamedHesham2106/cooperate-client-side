import Router from 'next/router';
import { Dispatch } from 'redux';
import actions from '.';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types/authentication.types';
import axiosInstance from '../../utils/axios';
import { getCookie, removeCookie, setCookie } from '../../utils/cookie';

type Login = {
  email: string;
  password: string;
  access?: string;
  refresh?: string;
};

const authenticate = ({ email, password, refresh, access }: Login) => {
  return async (dispatch: any) => {
    refresh && access
      ? dispatch({ type: AUTHENTICATE, payload: { refresh, access } })
      : (async () => {
          try {
            const { data } = await axiosInstance.post('/api/authenticate', {
              email,
              password,
            });
            const { accessToken, refreshToken } = data;
            setCookie('jwt_access', accessToken, 0.5);
            setCookie('jwt_refresh', refreshToken, 30);
            dispatch({
              type: AUTHENTICATE,
              payload: { refresh: refreshToken, access: accessToken },
            });
            await Router.push('/');
          } catch (error) {
            const err = error as IError;
            const { message } = err.response.data;
            console.log(message);
            dispatch(actions.showError(message, 'error'));
          }
        })();
  };
};

const reauthenticate = (refresh?: string, access?: string): unknown => {
  return async (dispatch: any) => {
    if (refresh && access) {
      dispatch({ type: AUTHENTICATE, payload: { access, refresh } });
    }
    if (!access && refresh) {
      try {
        const response = await axiosInstance.post('/api/refresh-token', {
          refreshToken: refresh,
        });
        const accessToken = response.data?.accessToken;
        setCookie('jwt_access', accessToken, 0.5);
        dispatch({
          type: AUTHENTICATE,
          payload: { refresh, access: accessToken },
        });
      } catch (e) {
        dispatch({ type: DEAUTHENTICATE });
      }
    }
  };
};

// removing the token
const deauthenticate = (): unknown => {
  return async (dispatch: any) => {
    const access = getCookie('jwt_access');
    const refresh = getCookie('jwt_refresh');
    removeCookie('jwt_access');
    removeCookie('jwt_refresh');

    if (refresh) {
      await Promise.all([
        axiosInstance.delete('/api/logout', {
          headers: { Authorization: `Bearer ${access}` },
          data: { refreshToken: refresh },
        }),
        await Router.push('/'),
      ]);
    }

    dispatch({ type: DEAUTHENTICATE });
  };
};

export default {
  authenticate,
  deauthenticate,
  reauthenticate,
};
