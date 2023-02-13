import { IncomingMessage } from 'http';
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

// export const getCookie = (key: string, req: IncomingMessage) => {
//   return process.browser
//     ? getCookieFromBrowser(key)
//     : getCookieFromServer(key, req);
// };
export const getCookie = (key: string) => {
  return getCookieFromBrowser(key);
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

// const getCookieFromServer = (key: string, req: IncomingMessage) => {
//   if (!req.headers.cookie) {
//     return null;
//   }
//   const rawCookie = req.headers.cookie
//     .split(';')
//     .find((c) => c.trim().startsWith(`${key}=`));
//   if (!rawCookie) {
//     return null;
//   }
//   return rawCookie.split('=')[1];
// };
