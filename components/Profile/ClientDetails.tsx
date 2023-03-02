import Image from 'next/image';
import { FC } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';

import Button from '../UI/Button';

interface IProps {
  isOwnProfile: boolean;
  user: IUser;
}
const ClientDetails: FC<IProps> = ({ isOwnProfile, user }) => {
  const { language, education, company_name } = user;
  return (
    <div className=' bg-white flex flex-col md:flex-row justify-between rounded-b-md px-3 my-8 border-t-2'>
      <div className=' md:w-2/6 py-6 px-3  md:border-r-2 md:border-gray-200 flex flex-wrap flex-col gap-5'>
        <div className='flex flex-col justify-between mt-3'>
          <div className='flex items-center gap-2'>
            <GrLanguage size={18} />
            <span className='font-semibold text-2xl pb-1'>Languages</span>
          </div>
          <div className='flex justify-center flex-col w-1/2 mt-3'>
            {language?.map((language, i) => (
              <div key={i} className='flex items-center gap-1'>
                <span className='font-semibold'>{language.language}</span>:
                <span className='capitalize'>{language.level}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2'>
            <FaGraduationCap size={25} />
            <span className='font-semibold text-2xl pb-1'>Education</span>
          </div>
          <div className='flex justify-center flex-col mt-3'>{education}</div>
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2'>
            <BsBuilding size={25} />
            <span className='font-semibold text-2xl pb-1'>Company Name</span>
          </div>
          <div className=' mt-3 px-4 py-2  text-base rounded-md text-blue-600 font-semibold bg-blue-100 '>
            {company_name}
          </div>
        </div>
      </div>
      <div className='md:w-4/6 py-6 px-3 flex flex-col gap-y-20'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl'>Your Postings</h1>
          <div className='flex flex-col items-center justify-center gap-3'>
            <Image
              src='/images/empty-jobs.svg'
              alt='empty folder'
              width={250}
              height={250}
            />
            <h1 className='font-semibold'>No active jobs posts</h1>
            <h1 className='text-gray-400'>
              Post a job to the marketplace and let talent come to you.
            </h1>
            {isOwnProfile && <Button width='45'>Post a Job</Button>}
          </div>
        </div>
        <div className='flex flex-col border-t-2 border-gray-200 pt-5 gap-5'>
          <h1 className='font-semibold text-2xl'>Reviews</h1>
          <article>
            <div className='flex items-center mb-2 space-x-4'>
              <div className='space-y-1 font-medium '>
                <p>
                  Jese Leos{' '}
                  <time
                    dateTime='2014-08-16 19:00'
                    className='block text-sm text-gray-500 dark:text-gray-400'
                  >
                    Joined on August 2014
                  </time>
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>First star</title>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                </svg>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Second star</title>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                </svg>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Third star</title>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                </svg>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Fourth star</title>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                </svg>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Fifth star</title>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                </svg>
              </div>

              <div className='mb-5 text-sm text-gray-500 '>
                <p>
                  Amazing Client{' '}
                  <time dateTime='2017-03-03 19:00'>March 3, 2022</time>
                </p>
              </div>
            </div>

            <p className='mb-2 font-normal text-gray-800 '>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati magni possimus ipsam dolor voluptatibus neque at
              similique totam cupiditate nisi fugiat mollitia dicta labore
              maxime quia, esse natus animi a? Sint expedita veniam sequi rem
              suscipit. Molestiae corrupti ex pariatur.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
