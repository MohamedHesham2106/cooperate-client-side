import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
  Redirect,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { getPayloadFromToken } from '../../../../utils/cookie';

interface IProps {
  userId: string | undefined;
}
const Settings: NextPage<IProps> = ({ userId }) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      Setting {userId}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Redirect | { [key: string]: string }>> => {
  const { req, params } = ctx;
  const { id } = params as ParsedUrlQuery;
  const userId = id?.toString().replace('~', '');
  const { jwt_refresh } = req.cookies;
  const payloadId = getPayloadFromToken(jwt_refresh)?.sub;
  const role = getPayloadFromToken(jwt_refresh)?.role;
  if (payloadId === userId && role === 'client') {
    return {
      props: { userId: payloadId },
    };
  }
  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  };
};
export default Settings;
