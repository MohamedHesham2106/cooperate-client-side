import axiosInstance from 'lib/axios';
import Router from 'next/router';

import { AUTHENTICATE, DEAUTHENTICATE } from '../types/authentication.types';
import { removeCookie, setCookie } from '../../lib/cookie';

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
        console.log(response.data);
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
      if (!access) {
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
const deauthenticate = (
  refresh: string | undefined,
  access: string | undefined
) => {
  return async (dispatch: any) => {
    try {
      if (refresh) {
        await axiosInstance.delete('/api/logout', {
          data: { refreshToken: refresh },
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        removeCookie('jwt_access');
        removeCookie('jwt_refresh');
        const { pathname } = Router;
        if (pathname !== '/') {
          await Router.push('/');
          dispatch({ type: DEAUTHENTICATE });
        }
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
