import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import InvitationForm from '../../../components/Invitation/InvitationForm';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';

interface IProps {
  user: Partial<IUser>;
  freelancer: Partial<IUser>;
}
const Invitation: NextPage<IProps> = ({ user, freelancer }) => {
  console.log(freelancer);
  return (
    <Container className='md:w-6/12 w-11/12 mx-auto my-24 border border-gray-300 rounded shadow-lg'>
      <InvitationForm user={user} freelancer={freelancer} />
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as ParsedUrlQuery;
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const freelancerId = id?.toString().replace('~', '');
    const payload = getPayloadFromToken(jwt_refresh);
    const [freelancerData, userData] = await Promise.all([
      getUserData(freelancerId, jwt_access),
      getUserData(payload.sub, jwt_access),
    ]);

    const freelancer = {
      _id: freelancerData._id,
      first_name: freelancerData.first_name,
      last_name: freelancerData.last_name,
    };
    const user = {
      _id: userData._id,
      jobs: userData.jobs,
    };
    if (payload.sub && payload.role === 'client' && freelancer._id) {
      return {
        props: {
          user,
          freelancer,
        },
      };
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Invitation;
