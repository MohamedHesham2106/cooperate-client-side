import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Button from '../components/UI/Button';

const FourOhFour: NextPage = () => {
  return (
    <div className='h-screen flex flex-col justify-center mx-auto items-center'>
      <div className='flex items-center justify-between px-6 pt-32 mx-auto md:pt-0'>
        <div className='relative flex flex-col-reverse items-center justify-between px-6 mx-auto lg:flex-row'>
          <div className='w-full  text-center md:mb-8 lg:text-left'>
            <h1 className=' font-sans text-3xl font-light text-center text-red-600 dark:text-red-500 lg:text-left lg:text-8xl md:text-5xl'>
              404
            </h1>
            <h1 className='font-sans text-3xl font-light text-center text-gray-700 lg:text-left lg:text-8xl md:text-5xl dark:text-white'>
              Sorry, this page isn&#x27;t available
            </h1>
            <Button
              type='button'
              className='font-semi-bold px-2 py-2 mt-16 text-lg transition duration-200 ease-in bg-blue-400 border-2 border-gray-700 w-auto hover:bg-blue-500 focus:outline-none'
            >
              <Link href='/'> Go back Home </Link>
            </Button>
          </div>
          <div className='relative block w-full mx-auto'>
            <Image
              src='/images/404.svg'
              width={750}
              height={750}
              alt='cooperate not found page'
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
