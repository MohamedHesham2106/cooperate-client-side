import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react';

import AdminEditProfile from '../../../components/Profile/AdminEditProfile';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';

interface IProps {
  user: IUser;
}
const Settings: NextPage<IProps> = ({ user }) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE User Settings | Manage Your Account and Preferences
        </title>
        <meta
          name='description'
          content='COO/RATE User Settings allows you to manage your account and preferences easily. Change your password, update your profile, and customize your notification settings all in one place. Sign up for free today!'
        />
        <meta
          name='keywords'
          content='COO/RATE User Settings, account management, preferences, password management, profile updates, notification settings'
        />
      </Head>
      <Container className='w-11/12 mx-auto my-24 border border-gray-300 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <AdminEditProfile user={user} />
      </Container>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const payload = getPayloadFromToken(jwt_refresh);
    if (payload) {
      const user = await getUserData(payload.sub, jwt_access);
      if (payload && payload.sub === user._id && user.role === 'admin') {
        return {
          props: {
            user,
          },
        };
      }
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Settings;
