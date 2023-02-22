import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
  Redirect,
} from 'next';
import React, { Fragment } from 'react';

import Login from '../../components/Forms/Login';

const LogIn: NextPage = () => {
  return (
    <Fragment>
      <Login />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<GetServerSidePropsResult<Redirect | any>> => {
  const { req } = ctx;
  const { jwt_refresh } = req.cookies;

  if (jwt_refresh) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default LogIn;
