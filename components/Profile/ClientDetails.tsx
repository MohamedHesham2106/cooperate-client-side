import Image from 'next/image';
import { FC } from 'react';
import { MouseEvent } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { MdEdit } from 'react-icons/md';

import JobList from '../Jobs/JobList';
import Button from '../UI/Button';

interface IProps {
  isOwnProfile: boolean;
  user: IUser;
  isSameRole: boolean;
  isFreelancer: 'freelancer' | 'client';
  ModalHandler?: (event: MouseEvent<SVGAElement | HTMLDivElement>) => void;
}
const ClientDetails: FC<IProps> = ({
  isFreelancer,
  isSameRole,
  isOwnProfile,
  user,
  ModalHandler,
}) => {
  const { language, education, jobs } = user;
  const renderLanguages = () => (
    <div className='flex justify-center flex-col w-1/2 mt-3'>
      {language?.map(({ language, level }, i) => (
        <div key={i} className='grid grid-cols-[1fr_2fr] items-center'>
          <span className='font-semibold'>{language}:</span>
          <span className='capitalize font-[350] text-gray-600 text-sm '>
            {level}
          </span>
        </div>
      ))}
    </div>
  );
  const renderEducation = () => (
    <div className='flex justify-center flex-col mt-3'>{education}</div>
  );

  return (
    <div className=' bg-white flex flex-col md:flex-row justify-between rounded-b-md px-3 my-8 border-t-2'>
      <div className=' md:w-2/6 py-6 px-3  md:border-r-2 md:border-gray-200 flex flex-wrap flex-col gap-5'>
        <div className='flex flex-col justify-between mt-3'>
          <div className='flex items-center gap-2 flex-wrap'>
            <GrLanguage size={18} />
            <span className='font-semibold text-2xl pb-1'>Languages</span>
            {isOwnProfile && (
              <div
                className='cursor-pointer border-2 rounded-full p-[0.3rem] border-blue-500'
                onClick={ModalHandler}
                data-modal-type='language'
              >
                <MdEdit size={12} />
              </div>
            )}
          </div>
          {renderLanguages()}
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2 flex-wrap'>
            <FaGraduationCap size={18} />
            <span className='font-semibold text-2xl pb-1'>Education</span>
          </div>
          {renderEducation()}
        </div>
      </div>
      <div className='md:w-4/6 py-6 px-3 flex flex-col'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl'>
            {isOwnProfile ? 'Your Postings' : 'Jobs Posted'}
          </h1>
          <span className='w-1/2 border-b-2 my-2 border-black'></span>
          {!jobs || jobs.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-3 my-5'>
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

              {isOwnProfile && <Button width='w-45'>Post a Job</Button>}
            </div>
          ) : (
            <JobList
              jobs={jobs}
              user={user}
              isSameRole={isSameRole}
              isOwnProfile={isOwnProfile}
              isFreelancer={isFreelancer}
            />
          )}
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
