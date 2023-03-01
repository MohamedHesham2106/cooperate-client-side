import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BiMap } from 'react-icons/bi';

import Rating from './Rating';
import Button from '../UI/Button';
interface IProps {
  isOwnProfile: boolean;
  user: IUser;
}
const FreelancerProfile: FC<IProps> = ({ isOwnProfile, user }) => {
  const { first_name, last_name, country, address, categories } = user;
  const nameStyle = !isOwnProfile
    ? 'flex flex-col gap-3 md:w-full md:pl-6'
    : 'flex flex-col gap-3 md:w-full';
  const handleInvite = () => {
    //Invite Logic
  };
  return (
    <div className='p-6 bg-white rounded-t-md '>
      <div
        className={`flex flex-col md:flex-row items-center ${
          !isOwnProfile ? 'justify-between gap-6 md:gap-0' : 'gap-6'
        }  `}
      >
        <div>
          <div className='w-24 h-24 bg-indigo-100 ring-offset-base-100 ring-offset-4 ring ring-blue-500  rounded-full shadow-2xl  inset-x-0   flex items-center justify-center text-indigo-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-20 w-20'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                clipRule='evenodd'
              />
            </svg>
            {isOwnProfile && (
              <Button
                onClick={handleInvite}
                className='w-24 h-24 group  hover:bg-gray-200 opacity-70 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500'
              >
                <Image
                  className='hidden group-hover:block w-10'
                  src='https://www.svgrepo.com/show/33565/upload.svg'
                  alt=''
                  width={128}
                  height={128}
                />
              </Button>
            )}
          </div>
        </div>
        <div className={nameStyle}>
          <div className='capitalize text-2xl font-normal '>
            {first_name} {last_name}
          </div>
          {categories && (
            <div className='capitalize text-sm font-semibold flex items-center justify-center md:justify-start'>
              <span title={categories[0]?.name} className='text-blue-500 '>
                {categories[0]?.name}
              </span>
            </div>
          )}
          <div className='capitalize text-xs font-normal flex md:gap-1 items-center justify-center md:justify-start'>
            <BiMap size={15} color='#fa923d' />
            <span>
              {address ? address + ',' : ''}
              {country}
            </span>
          </div>
          <div className='flex items-center justify-center md:justify-start last:'>
            <Rating />
          </div>
        </div>
        {!isOwnProfile ? (
          <div className='flex justify-between'>
            <Button className='w-44 text-white text-center py-2 px-8 capitalize rounded bg-blue-500 hover:bg-blue-700 shadow hover:shadow-lg font-medium'>
              Invite
            </Button>
          </div>
        ) : (
          <div className='flex justify-between'>
            <Link
              href={`/${user.role}/~${user._id}/settings`}
              className='w-44 text-white py-2 text-center px-8 capitalize rounded bg-blue-500 hover:bg-blue-700 shadow hover:shadow-lg font-medium'
            >
              Profile Settings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
