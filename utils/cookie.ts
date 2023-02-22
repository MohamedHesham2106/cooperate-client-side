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

export const getPayloadFromToken = (token: string | undefined) => {
  if (!token) {
    return null;
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [header, payload, signature] = token.split('.');
  const decodedPayload = decodeBase64Url(payload);
  return JSON.parse(decodedPayload);
};

const decodeBase64Url = (base64Url: string) => {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return b64DecodeUnicode(base64);
};

const b64DecodeUnicode = (str: string) => {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c: string) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
};
export const isAuthenticated = () => {
  const refresh = getCookie('jwt_refresh');
  if (!refresh) return false;
  return true;
};
