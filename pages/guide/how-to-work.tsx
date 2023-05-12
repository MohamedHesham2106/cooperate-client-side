import React from 'react';

import FreelancerGuide from '../../components/Guide/FreelancerGuide';
import Container from '../../components/UI/Container';

const HowToHire = () => {
  return (
    <Container className='px-5 mt-24 w-full '>
      <h1 className='text-6xl mb-10 font-serif text-center bg-blue-400 p-5 text-white rounded-md'>
        Work Guide
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5'>
        <FreelancerGuide />
      </div>
    </Container>
  );
};

export default HowToHire;
