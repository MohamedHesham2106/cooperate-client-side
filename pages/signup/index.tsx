import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
  Redirect,
} from 'next';
import React, { Fragment, useState } from 'react';

import Register from '../../components/Forms/Register';
import UserType from '../../components/Forms/UserType';

const SignUp: NextPage = () => {
  const [role, setRole] = useState<string>('');

  const userType = (UserType: string): void => {
    setRole(UserType);
    // console.log(type);
  };
  return (
    <Fragment>
      {!role && <UserType roleFetch={userType} />}
      {role && <Register role={role} />}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<Redirect | { [key: string]: undefined }>
> => {
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

export default SignUp;
