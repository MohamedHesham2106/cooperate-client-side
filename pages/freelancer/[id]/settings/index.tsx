import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import FreelancerEditProfile from '../../../../components/Profile/FreelancerEditProfile';
import Container from '../../../../components/UI/Container';
import axiosInstance from '../../../../utils/axios';
import { getPayloadFromToken } from '../../../../utils/cookie';
import { getUserData } from '../../../../utils/user';

interface IProps {
  user: IUser;
  categories: Category[];
}

const Settings: NextPage<IProps> = ({ user, categories }) => {
  return (
    <Container className='md:w-10/12 w-11/12 mx-auto my-24 border border-gray-300 rounded-md shadow-lg'>
      <FreelancerEditProfile user={user} categories={categories} />
    </Container>
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
    const response = await axiosInstance.get('/api/category');
    const categories = response.data.categories;
    const payload = getPayloadFromToken(jwt_refresh);
    if (payload.sub === user._id && user.role === 'freelancer') {
      return {
        props: {
          user,
          categories,
        },
      };
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Settings;
