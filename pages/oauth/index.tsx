import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
  Redirect,
} from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';

import Login from '../../components/Forms/Login';

const LogIn: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>COO/RATE | Freelance Login</title>
        <meta
          name='description'
          content='Login to COO/RATE and start working as a freelancer today. Get access to high-quality clients and projects in your field.'
        />
        <meta name='keywords' content='COO/RATE, freelance, login' />
        <meta name='robots' content='noindex, nofollow' />
      </Head>
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
