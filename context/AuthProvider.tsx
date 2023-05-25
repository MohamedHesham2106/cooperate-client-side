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

// Custom Hook to access the authentication context
export const useAuthenticate = () => useContext(AuthContext);

function AuthProvider({ children }: Props) {
  // State variables to store the tokens and user ID
  const [accessToken, setAccessToken] = useState(
    getCookie('jwt_access') || undefined
  );
  const [refreshToken, setRefreshToken] = useState(
    getCookie('jwt_refresh') || undefined
  );
  const [userId, setUserId] = useState(getCookie('uuid') || undefined);

  // State Variable to track initial mount
  const [isFirstMounted, setIsFirstMounted] = useState(true);

  // Function to handle user Authentication
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
        toast.error('Invalid email or password.');
      }
      if (isFirstMounted) {
        setIsFirstMounted(false);
      }
    },
    [isFirstMounted]
  );

  // Function to handle user Sign Out
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
  // Function to check if a token is expired
  const isTokenExpired = (token: string): boolean => {
    const decoded = getPayloadFromToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    return Date.now() > decoded.exp * 1000;
  };

  // Function to update the access token using the refresh token
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
        toast.error('Something went wrong.', {
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
        updateAccessToken(refreshToken).catch((_error) => {
          // Handle the error
          toast.error('Something went wrong');
        });
      }
      const intervalId = setInterval(() => {
        updateAccessToken(refreshToken).catch((_error) => {
          // Handle the error
          toast.error('Something went wrong');
        });
      }, ACCESS_TOKEN_EXPIRE);
      return () => clearInterval(intervalId);
    } else {
      handleSignOut().catch((_error) => {
        toast.error('Something went wrong');
      });
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
