import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import DashboardTitle from '../../../components/Admin/DashboardTitle';
import ReviewsList from '../../../components/Admin/Reviews/ReviewsList';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';

const Reviews: NextPage = () => {
  return (
    <Container className='p-5 w-full grid grid-cols-1 gap-16'>
      <DashboardTitle
        pageName='Reviews'
        url='Dashboard'
        title='Reviews Management'
      />
      <ReviewsList />
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
export default Reviews;
