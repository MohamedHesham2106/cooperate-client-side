import cookie from 'js-cookie';

export const setCookie = (key: string, value: string, date: number) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: date,
      path: '/',
      secure: true,
    });
  }
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const removeCookie = (key: string) => {
  cookie.remove(key);
};

export const getPayloadFromToken = (token: string) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1] as string;
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
export const isAuthenticated = () => {
  const refresh = getCookie('jwt_refresh');
  if (!refresh) return false;
  return true;
};
