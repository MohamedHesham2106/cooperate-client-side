import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useMemo } from 'react';

import Blob from '../SVG/Blob';
import { fadeIn } from '../../utils/variants';

const Hero: FC = () => {
  const variants = useMemo(() => fadeIn('down', 0.5), []);
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.5 }}
      className='bg-transparent'
    >
      <div className='relative px-6 pt- lg:px-8'>
        <div className='absolute right-0 top-0 z-[-1] hidden md:block'>
          <Blob />
        </div>
        <div className='flex items-center w-full pt-44 pb-16 px-2 z-10'>
          <div className='text-start'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-serif'>
              Hire the best freelancers for any job, online
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600 '>
              Discover the Talent You Need, Today Find and hire top-quality
              freelancers for your next project with ease. you'll find the
              expertise you need to get the job done right.
            </p>
            <div className='mt-10 flex items-center justify-start gap-x-6'>
              <Link
                href='/signup'
                className='rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
              >
                Get started
              </Link>
              <Link
                href='#'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Learn more <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
          <div className='relative hidden sm:hidden xs:flex lg:flex lg:justify-end'>
            <Image
              src='/images/sapiens.svg'
              width={750}
              height={750}
              alt='Cooperate Hero'
              priority
              className='relative'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
