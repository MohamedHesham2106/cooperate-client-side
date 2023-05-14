import { GetServerSideProps, NextPage } from 'next';

import DashboardTitle from '../../../components/Admin/DashboardTitle';
import CreateUsers from '../../../components/Admin/User Management/CreateUsers';
import UserList from '../../../components/Admin/User Management/UserList';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';

const DashboardUser: NextPage = () => {
  return (
    <Container className='w-full grid grid-cols-1 gap-16'>
      <div className='p-5 '>
        <DashboardTitle
          pageName='User Management'
          url='Dashboard'
          title='User Management'
        />
        <CreateUsers />
      </div>

      <UserList />
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;
  try {
    const role = getPayloadFromToken(jwt_refresh)?.role;
    if (role !== 'admin') {
      return { redirect: { destination: '/404', permanent: false } };
    }
    return {
      props: {},
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default DashboardUser;
