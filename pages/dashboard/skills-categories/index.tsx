import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import DashboardTitle from '../../../components/Admin/DashboardTitle';
import CategoryForm from '../../../components/Admin/SkillCategory/CategoryForm';
import SkillForm from '../../../components/Admin/SkillCategory/SkillForm';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';

const AddSkillsOrCategories: NextPage = () => {
  return (
    <Container className='p-5 w-full grid grid-cols-1 gap-16'>
      <DashboardTitle
        pageName='Skills - Categories'
        url='Dashboard'
        title='Skills-Categories Management'
      />
      <CategoryForm />
      <SkillForm />
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
export default AddSkillsOrCategories;
