import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';

import { getPayloadFromToken } from '../../../utils/cookie';
interface IProps {
  userId: undefined | string;
  isOwnProfile: boolean;
}
const Client: NextPage<IProps> = ({ userId, isOwnProfile }) => {
  return (
    <Fragment>
      {isOwnProfile ? (
        <h1 className='h-screen flex items-center justify-center'>
          I'm The User:{userId}
        </h1>
      ) : (
        <h1 className='h-screen flex items-center justify-center'>
          NOPE NOT ME:{userId}
        </h1>
      )}
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ [key: string]: unknown }>> => {
  const { req, params } = ctx;
  const { id } = params as ParsedUrlQuery;
  const userId = id?.toString().replace('~', '');
  const { jwt_refresh } = req.cookies;
  const payloadId = getPayloadFromToken(jwt_refresh)?.sub;
  const role = getPayloadFromToken(jwt_refresh)?.role;
  if (payloadId === userId && role === 'client') {
    return {
      props: { userId: payloadId, isOwnProfile: true },
    };
  }
  return {
    props: { userId: userId, isOwnProfile: false },
  };
};
export default Client;
