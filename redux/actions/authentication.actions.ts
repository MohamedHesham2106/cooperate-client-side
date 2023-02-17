import axiosInstance from 'lib/axios';
import Router from 'next/router';

import { AUTHENTICATE, DEAUTHENTICATE } from '../types/authentication.types';
import { getCookie, removeCookie, setCookie } from '../../lib/cookie';

type Login = {
  email: string;
  password: string;
  access?: string;
  refresh?: string;
};
const authenticate = ({ email, password, refresh, access }: Login) => {
  return async (dispatch: any) => {
    try {
      if (refresh && access) {
        dispatch({
          type: AUTHENTICATE,
          payload: { refresh: refresh, access: access },
        });
      } else {
        const response = await axiosInstance.post('/api/authenticate', {
          email,
          password,
        });
        const { accessToken, refreshToken } = response.data;
        setCookie('jwt_access', accessToken, 0.5);
        setCookie('jwt_refresh', refreshToken, 30);
        dispatch({
          type: AUTHENTICATE,
          payload: { refresh: refreshToken, access: accessToken },
        });
        await Router.push('/');
      }
    } catch (e) {
      // console.log(e);
      dispatch({ type: DEAUTHENTICATE });
    }
  };
};

const reauthenticate = (
  refresh: string | undefined,
  access: string | undefined
): any => {
  return async (dispatch: any) => {
    try {
      if (refresh && access) {
        dispatch({ type: AUTHENTICATE, payload: { access, refresh } });
      }
      if (!access && refresh) {
        const response = await axiosInstance.post('/api/refresh-token', {
          refreshToken: refresh,
        });
        const { accessToken } = response.data;
        setCookie('jwt_access', accessToken, 0.5);
        dispatch({
          type: AUTHENTICATE,
          payload: { refresh, access: accessToken },
        });
      }
    } catch (e) {
      dispatch({ type: DEAUTHENTICATE });
    }
  };
};

// removing the token
const deauthenticate = () => {
  return async (dispatch: any) => {
    try {
      const refresh = getCookie('jwt_refresh');
      const access = getCookie('jwt_access');

      if (refresh) {
        await axiosInstance.delete('/api/logout', {
          headers: { Authorization: `Bearer ${access}` },
          data: { refreshToken: refresh },
        });
        removeCookie('jwt_access');
        removeCookie('jwt_refresh');
        const { pathname } = Router;

        await Router.push(pathname);
        dispatch({ type: DEAUTHENTICATE });
      } else {
        removeCookie('jwt_access');
        removeCookie('jwt_refresh');
        const { pathname } = Router;
        if (pathname !== '/') {
          await Router.push('/');
          dispatch({ type: DEAUTHENTICATE });
        }
      }
    } catch (e) {
      dispatch({ type: DEAUTHENTICATE });
    }
  };
};

export default {
  authenticate,
  deauthenticate,
  reauthenticate,
};
