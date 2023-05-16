import { NextPage } from 'next';
import React from 'react';

import ClientGuide from '../../components/Guide/ClientGuide';
import Container from '../../components/UI/Container';

const HowToHire: NextPage = () => {
  return (
    <Container className='px-5 mt-24 w-full '>
      <h1 className='text-6xl mb-10 font-serif text-center bg-blue-900 p-5 text-white rounded-md'>
        Hiring Guide
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5'>
        <ClientGuide />
      </div>
    </Container>
  );
};

export default HowToHire;
