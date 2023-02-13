import axiosInstance from 'lib/axios';
import Router from 'next/router';

import { AUTHENTICATE, DEAUTHENTICATE } from '../types/authentication.types';
import { getCookie, removeCookie, setCookie } from '../../lib/cookie';


type Login = {
  email: string;
  password: string;
};
export const authenticate = ({ email, password }: Login) => {
  return async (dispatch: any) => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (): any => {
  return async (dispatch: any) => {
    const access = getCookie('jwt_access');
    const refresh = getCookie('jwt_refresh');
    try {
      if (!access && refresh) {
        const response = await axiosInstance.post('/api/refresh-token', {
          refreshToken: refresh,
        });
        const { accessToken } = response.data;
        setCookie('jwt_access', accessToken, 0.5);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// removing the token
export const deauthenticate = () => {
  return async (dispatch: any) => {
    try {
      const refresh = getCookie('refresh');
      const access = getCookie('access');
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
      }
      dispatch({ type: DEAUTHENTICATE });
    } catch (e) {
      console.log(e);
    }
  };
};

// const updateUserData = (token: string | null, body: any) => {
//   return async (dispatch: any) => {
//     if (token) {
//       const {
//         data: { user },
//       } = await axios.put('/api/user', body, {
//         headers: {
//           authorization: token,
//         },
//       });
//       if (user) {
//         dispatch({ type: AUTHENTICATE, payload: { user, token } });
//       }
//     }
//   };
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  authenticate,
  deauthenticate,
  reauthenticate,
};
