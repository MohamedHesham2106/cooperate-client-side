import Image from 'next/image';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className=' pb-12 bg-gray-900 dark:bg-gray-800 rounded-md m-5'>
      <div className='mx-auto container pt-20 lg:pt-32 flex flex-col items-center justify-center'>
        <Image
          src='/logo.png'
          className='mr-5'
          height={200}
          width={200}
          alt='cooperate logo'
        />

        <div className='text-white flex flex-col md:items-center pt-3'>
          <h1 className='text-2xl font-black'>Remote. Diverse. Flexible.</h1>

          <div className='my-6 text-base text-white '>
            <ul className='md:flex items-center'>
              <li className=' md:mr-6 cursor-pointer pt-4 lg:py-0'>Home</li>
              <li className=' md:mr-6 cursor-pointer pt-4 lg:py-0'>About</li>
              <li className=' md:mr-6 cursor-pointer pt-4 lg:py-0'>Jobs</li>
              <li className=' md:mr-6 cursor-pointer pt-4 lg:py-0'>Help</li>
              <li className='cursor-pointer pt-4 lg:py-0'>Privacy Policy</li>
            </ul>
          </div>
          <div className='text-sm text-white mb-10 '>
            <p> © 2023 Cooperate. All rights reserved</p>
          </div>
        </div>
        <div className='w-9/12  h-0.5 bg-gray-100 rounded-full' />
      </div>
    </footer>
  );
};

export default Footer;
