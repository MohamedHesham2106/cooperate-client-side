import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import Button from '../UI/Button';
import Container from '../UI/Container';

const Hero: FC = () => {
  return (
    <Container className='relative h-[90vh] mt-16 p-6 flex items-center overflow-hidden bg-gray-900'>
      <div className=' relative flex px-6 pt-12'>
        <div className='relative flex flex-col w-full'>
          <h1 className='flex flex-col text-3xl font-semibold leading-none text-white uppercase font-bebas-neue sm:text-5xl '>
            <span>Hire the best freelancers for any job, online.</span>
          </h1>
          <span className='w-24 h-1.5 my-5 sm:my-8 bg-orange-400 sm:block'></span>
          <p className='text-sm mt-2 text-white lg:text-lg'>
            Discover the Talent You Need, Today Find and hire top-quality
            freelancers for your next project with ease. you'll find the
            expertise you need to get the job done right.
          </p>
          <Button className='flex mt-8'>
            <Link
              href='/signup'
              className='text-xs font-medium sm:text-base px-4 py-2 mr-4 text-white uppercase bg-blue-500 border-2 border-transparent rounded-full text-md hover:bg-blue-400'
            >
              Get Started
            </Link>
          </Button>
        </div>
        <div className='relative hidden sm:hidden xs:flex lg:flex lg:justify-end'>
          <Image
            src='/images/sapiens.svg'
            width={750}
            height={750}
            alt='Cooperate Hero'
            priority
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
