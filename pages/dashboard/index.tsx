import { GetServerSideProps, NextPage } from 'next';

import DashboardContent from '../../components/Admin/Dashboard/DashboardContent';
import DashboardTitle from '../../components/Admin/DashboardTitle';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';
interface IProps {
  dashboardData: IDashboard;
}

const Dashboard: NextPage<IProps> = ({ dashboardData }) => {
  return (
    <Container className='p-5 w-full grid grid-cols-1 gap-16'>
      <DashboardTitle pageName='Dashboard' url='Home' title='Dashboard' />
      <DashboardContent data={dashboardData} />
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh, jwt_access } = req.cookies;
  try {
    const role = getPayloadFromToken(jwt_refresh)?.role;
    const dashboardData = (
      await axiosInstance.get('/api/admin/', {
        headers: {
          Authorization: `Bearer ${jwt_access}`,
        },
      })
    ).data;
    if (role !== 'admin') {
      return { redirect: { destination: '/404', permanent: false } };
    }
    return {
      props: {
        dashboardData: dashboardData.message,
      },
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Dashboard;
