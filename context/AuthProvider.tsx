import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { AuthContext, IAuthContext } from './AuthContext';
import axiosInstance from '../utils/axios';
import {
  getCookie,
  getPayloadFromToken,
  removeCookie,
  setCookie,
} from '../utils/cookie';

const REFRESH_TOKEN_EXPIRE = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_EXPIRE = 30 * 60 * 1000; // 30 min

type Props = {
  children: JSX.Element;
};
export const useAuthenticate = () => useContext(AuthContext);

function AuthProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState(
    getCookie('jwt_access') || undefined
  );
  const [refreshToken, setRefreshToken] = useState(
    getCookie('jwt_refresh') || undefined
  );
  const [userId, setUserId] = useState(getCookie('uuid') || undefined);

  const [isFirstMounted, setIsFirstMounted] = useState(true);

  const handleAuthentication = useCallback(
    async (email: IUser['email'], password: IUser['password']) => {
      try {
        const { data } = await axiosInstance.post('/api/authenticate', {
          email,
          password,
        });
        const { accessToken, refreshToken, userId } = data;
        setCookie('jwt_access', accessToken, ACCESS_TOKEN_EXPIRE);
        setCookie('jwt_refresh', refreshToken, REFRESH_TOKEN_EXPIRE);
        setCookie('uuid', userId, REFRESH_TOKEN_EXPIRE);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserId(userId);

        window.location.href = 'http://localhost:3000/';
      } catch (error) {
        // const err = error as IError;
        // const { message } = err.response.data;

        toast.error('Invalid email or password.');
        // console.log(message);
      }
      if (isFirstMounted) {
        setIsFirstMounted(false);
      }
    },
    [isFirstMounted]
  );

  const handleSignOut = useCallback(async () => {
    const access = getCookie('jwt_access');
    const refresh = getCookie('jwt_refresh');
    removeCookie('jwt_access');
    removeCookie('jwt_refresh');
    removeCookie('uuid');
    if (refresh) {
      await Promise.all([
        axiosInstance.delete('/api/logout', {
          headers: { Authorization: `Bearer ${access}` },
          data: { refreshToken: refresh },
        }),
        (window.location.href = 'http://localhost:3000/oauth'),
      ]);
    }
  }, []);
  const isTokenExpired = (token: string): boolean => {
    const decoded = getPayloadFromToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    return Date.now() > decoded.exp * 1000;
  };

  const updateAccessToken = useCallback(async (refresh?: string) => {
    const access = getCookie('jwt_access');
    if (refresh && (!access || isTokenExpired(access))) {
      try {
        const response = await axiosInstance.post('/api/refresh-token', {
          refreshToken: refresh,
        });
        const accessToken = response.data?.accessToken;
        setCookie('jwt_access', accessToken, ACCESS_TOKEN_EXPIRE);
        if (accessToken !== access) {
          setAccessToken(accessToken);
        }
        window.location.reload();
      } catch (error) {
        const err = error as IError;
        const { message } = err.response.data;
        toast.error(message, {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (refreshToken) {
      if (!accessToken) {
        updateAccessToken(refreshToken);
      }
      const intervalId = setInterval(() => {
        updateAccessToken(refreshToken);
      }, ACCESS_TOKEN_EXPIRE);
      return () => clearInterval(intervalId);
    } else {
      handleSignOut();
    }
  }, [
    isFirstMounted,
    accessToken,
    refreshToken,

    updateAccessToken,
    handleSignOut,
  ]);

  const value = useMemo(
    () => ({
      accessToken: accessToken,
      refreshToken: refreshToken,
      uuid: userId,
      Authenticate: handleAuthentication,
      SignOut: handleSignOut,
    }),
    [accessToken, handleAuthentication, handleSignOut, refreshToken, userId]
  ) as IAuthContext;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
