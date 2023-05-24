import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface IProps {
  freelancer: IUser;
}

const Freelancer: React.FC<IProps> = ({ freelancer }) => {
  return (
    <>
      <div className='flex items-center justify-center w-full py-8'>
        {/* Card code block start */}
        <div className='bg-white dark:bg-gray-800 shadow rounded w-full'>
          <div className='relative'>
            <div className='inset-0 m-auto w-20 h-20 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white dark:border-gray-900  overflow-hidden'>
              <Image
                className='object-cover'
                fill
                src={
                  freelancer.imageUrl
                    ? freelancer.imageUrl
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                alt={
                  freelancer.username
                    ? freelancer.username
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
              />
            </div>
          </div>
          <div className='px-5 xl:px-10 pb-10 w-full border dark:border-none'>
            <div className='pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between w-full'>
              <div className='xl:pr-16 w-full xl:w-2/3'>
                <div className='text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start'>
                  <h2 className='mt-10 text-xl text-gray-800 dark:text-blue-500 font-medium tracking-normal'>
                    {freelancer.first_name} {freelancer.last_name}
                  </h2>
                </div>
                <p className='text-center xl:text-left mt-2 text-sm tracking-normal text-gray-600  leading-5 dark:text-white'>
                  {freelancer.biography
                    ? freelancer.biography.slice(0, 100)
                    : 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.      '}
                </p>
              </div>
              <div className='w-full xl:w-2/3 flex-col md:flex-row justify-center xl:justify-end flex md:pl-6'>
                {freelancer.categories && freelancer.categories.length > 1 && (
                  <div className='flex items-center justify-center xl:justify-start mt-1 md:mt-0 mb-5 md:mb-0'>
                    <div className='rounded-md bg-blue-500 text-white   px-6 py-2 flex justify-center items-center text-xs'>
                      {freelancer.categories?.[0]?.name}
                    </div>
                    {freelancer.categories?.[1]?.name && (
                      <div className='ml-5 rounded-md bg-blue-500 text-white  px-6 py-2 flex justify-center items-center text-xs'>
                        {freelancer.categories?.[1]?.name}
                      </div>
                    )}
                  </div>
                )}
                <Link
                  href={`/freelancer/~${freelancer._id}`}
                  className='focus:outline-none ml-0 md:ml-5 text-center bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm'
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Card code block end */}
      </div>
    </>
  );
};

export default Freelancer;
