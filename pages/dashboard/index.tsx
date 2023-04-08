import { GetServerSideProps, NextPage } from 'next';

import DashboardContent from '../../components/Admin/Dashboard/DashboardContent';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';
interface IProps {
  dashboardData: IDashboard;
}

const Dashboard: NextPage<IProps> = ({ dashboardData }) => {
  return (
    <Container className='p-5 w-full grid grid-cols-1 gap-16'>
      <div className='flex flex-col gap-2'>
        <h1
          className='text-4xl font-bold 
      '
        >
          Dashboard
        </h1>
        <h6
          className='text-xl font-semibold bg-gray-100 shadow flex gap-2 items-center p-2
      '
        >
          Home <span className='text-gray-400'>/ Dashboard</span>
        </h6>
      </div>

      <DashboardContent data={dashboardData} />
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;
  try {
    const role = getPayloadFromToken(jwt_refresh).role;
    const dashboardData = (await axiosInstance.get('/api/admin/')).data;
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
