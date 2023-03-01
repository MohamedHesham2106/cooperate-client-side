import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
  Redirect,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import FreelancerDetails from '../../../components/Profile/FreelancerDetails';
import FreelancerProfile from '../../../components/Profile/FreelancerProfile';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';

interface IProps {
  user: IUser;
  isOwnProfile: boolean;
}
const Freelancer: NextPage<IProps> = ({ isOwnProfile, user }) => {
  return (
    <Container className='md:w-9/12 w-11/12 mx-auto my-24 border border-gray-300 rounded-md shadow-lg'>
      <FreelancerProfile isOwnProfile={isOwnProfile} user={user} />
      <FreelancerDetails isOwnProfile={isOwnProfile} user={user} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Redirect | { [key: string]: unknown }>> => {
  const { req, params } = ctx;
  const { id } = params as ParsedUrlQuery;
  const userId = id?.toString().replace('~', '');
  const { jwt_refresh, jwt_access } = req.cookies;

  const user = await getUserData(userId, jwt_access);
  const payloadId = getPayloadFromToken(jwt_refresh)?.sub;
  if (!!user && payloadId === user._id && user.role === 'freelancer') {
    return {
      props: { user: user, isOwnProfile: true },
    };
  } else if (!!user && user.role === 'freelancer') {
    return {
      props: { user: user, isOwnProfile: false },
    };
  } else {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};
export default Freelancer;
