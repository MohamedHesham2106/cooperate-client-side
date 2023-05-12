import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';

import FreelancerDetails from '../../../components/Profile/FreelancerDetails';
import Profile from '../../../components/Profile/Profile';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';

interface IProps {
  user: IUser;
  isOwnProfile: boolean;
  isSameRole: boolean;
  isFreelancer: 'freelancer' | 'client' | undefined;
}

const Freelancer: NextPage<IProps> = ({
  isOwnProfile,
  user,
  isSameRole,
  isFreelancer,
}) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE | Freelancer Profile - Showcase Your Skills and Get Hired
          Today
        </title>
        <meta
          name='description'
          content='Create your freelancer profile on COO/RATE and showcase your skills to potential clients. Bid on projects, communicate with clients, and get hired for your expertise. Build your reputation as a trusted and skilled professional in the freelancing industry.'
        />
        <meta
          name='keywords'
          content='COO/RATE, freelancer profile, showcase skills, bid on projects, communicate with clients, get hired, build reputation'
        />
      </Head>
      <Container className='md:w-9/12 w-11/12 mx-auto my-24  dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-900'>
        <Profile
          isOwnProfile={isOwnProfile}
          isSameRole={isSameRole}
          isFreelancer={isFreelancer}
          user={user}
        />
        <FreelancerDetails isOwnProfile={isOwnProfile} user={user} />
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
    if (payload) {
      const isFreelancer =
        payload.role === 'freelancer'
          ? 'freelancer'
          : payload.role === 'client'
          ? 'client'
          : undefined;

      if (user.role !== 'freelancer') {
        return { redirect: { destination: '/404', permanent: false } };
      }
      return {
        props: {
          user,
          isOwnProfile: payload.sub === user._id,
          isSameRole: payload.role === user.role,
          isFreelancer: isFreelancer,
        },
      };
    }
    return { redirect: { destination: '/404', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};

export default Freelancer;
