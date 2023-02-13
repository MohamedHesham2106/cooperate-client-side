// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GetServerSidePropsContext } from 'next-redux-wrapper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Store } from 'redux';

import { getCookie } from '../../cookie';

export function getAccessToken(
  ctx: GetServerSidePropsContext & {
    store: Store;
  }
): string | null {
  return ctx.req
    ? getCookie('access', ctx.req)
    : ctx.store.getState().authentication.token;
}
export function getRefreshToken(
  ctx: GetServerSidePropsContext & {
    store: Store;
  }
): string | null {
  return ctx.req
    ? getCookie('refresh', ctx.req)
    : ctx.store.getState().authentication.token;
}
