import axiosInstance from 'lib/axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GetServerSidePropsContext } from 'next-redux-wrapper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AnyAction, Store } from 'redux';

import { getAccessToken, getRefreshToken } from './helper/getTokens';
import actions from '../../redux/actions';
import { RootState } from '../../redux/types/global.types';

export default async function configUser(
  ctx: GetServerSidePropsContext & { store: Store<RootState, AnyAction> }
): Promise<any> {
  const access = getAccessToken(ctx);
  const refreshToken = getRefreshToken(ctx);
  if (refreshToken && !access) {
    const response = await axiosInstance.post('/api/refresh-token', {
      refreshToken,
    });
    if (response.data.accessToken) {
      ctx.store.dispatch(actions.reauthenticate(response.data.accessToken));
    }
  }
}
