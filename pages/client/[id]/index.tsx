import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';

import ClientDetails from '../../../components/Profile/ClientDetails';
import Profile from '../../../components/Profile/Profile';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';
interface IProps {
  user: IUser;
  isOwnProfile: boolean;
  isSameRole: boolean;
  isFreelancer: 'freelancer' | 'client' | null;
}
const Client: NextPage<IProps> = ({
  isOwnProfile,
  user,
  isSameRole,
  isFreelancer,
}) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE | Client Profile - Hire the Best Freelancers Today
        </title>
        <meta
          name='description'
          content='Create your client profile on COO/RATE and gain access to a pool of skilled freelancers. Post your project requirements, review proposals, and hire the best talent for the job. Get your projects done on time and on budget.'
        />
        <meta
          name='keywords'
          content='COO/RATE, client profile, freelance, post projects, review proposals, hire talent'
        />
      </Head>

      <Container className='md:w-9/12 w-11/12 mx-auto my-24 border border-gray-300 dark:border-none dark:bg-gray-800 rounded-md shadow-lg'>
        <Profile
          isOwnProfile={isOwnProfile}
          isSameRole={isSameRole}
          isFreelancer={isFreelancer}
          user={user}
        />
        <ClientDetails
          isOwnProfile={isOwnProfile}
          isSameRole={isSameRole}
          isFreelancer={isFreelancer}
          user={user}
        />
      </Container>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as ParsedUrlQuery;
  const userId = id?.toString().replace('~', '');
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const user = await getUserData(userId, jwt_access);
    const payload = getPayloadFromToken(jwt_refresh);

    let isFreelancer = null;

    if (payload?.role === 'freelancer') {
      isFreelancer = 'freelancer';
    } else if (payload?.role === 'client') {
      isFreelancer = 'client';
    }

    return {
      props: {
        user,
        isOwnProfile: payload ? payload.sub === user._id : false,
        isSameRole: payload ? payload.role === user.role : false,
        isFreelancer,
      },
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};

export default Client;
