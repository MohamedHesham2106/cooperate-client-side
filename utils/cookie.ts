import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
interface IJWTPayload {
  sub: string;
  iat: number;
  exp: number;
  type: 'refresh' | 'access';
  role: 'client' | 'freelancer' | 'admin';
}
export const setCookie = (key: string, value: string, expiryTimeMs: number) => {
  const expires = new Date(Date.now() + expiryTimeMs);
  cookie.set(key, value, {
    expires,
    secure: true,
  });
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const removeCookie = (key: string) => {
  cookie.remove(key);
};

export const getPayloadFromToken = (token: string | undefined) => {
  if (!token) {
    return null;
  }
  const decodedPayload: IJWTPayload = jwtDecode(token);
  return decodedPayload;
};
export const isAuthenticated = () => {
  const refresh = getCookie('jwt_refresh');
  if (!refresh) return false;
  return true;
};
