import React from 'react';

import DashboardTitle from '../../../components/Admin/DashboardTitle';
import CategoryForm from '../../../components/Admin/SkillCategory/CategoryForm';
import SkillForm from '../../../components/Admin/SkillCategory/SkillForm';
import Container from '../../../components/UI/Container';

const AddSkillsOrCategories = () => {
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

export default AddSkillsOrCategories;
