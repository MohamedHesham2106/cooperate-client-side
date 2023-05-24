import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Freelancers from '../../components/Freelancers/Freelancers';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
import { getRole } from '../../utils/user';
interface IProps {
  freelancers: IUser[];
}
const ClientHome: NextPage<IProps> = ({ freelancers }) => {
  const router = useRouter();
  useEffect(() => {
    if (getRole() !== 'client') {
      router.back();
    }
  }, [router]);
  return (
    <Container className='mt-24 w-full'>
      <Freelancers freelancers={freelancers} />
    </Container>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  try {
    const topFreelancers = (await axiosInstance('/api/freelancer')).data.users;
    return {
      props: {
        freelancers: topFreelancers,
      },
      revalidate: 604800,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
export default ClientHome;
