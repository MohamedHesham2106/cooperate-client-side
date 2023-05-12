import Link from 'next/link';
import { FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
const GuideDropDown: FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div>
      <div
        className='flex items-center justify-center cursor-pointer hover:text-blue-500 gap-1'
        onMouseEnter={() => {
          setShowDropDown(true);
        }}
      >
        How to use
        <FiChevronDown
          className={`mt-0.5 transition-all ease-in-out ${
            showDropDown && 'rotate-180'
          }`}
        />
      </div>
      <div
        onMouseLeave={() => setShowDropDown(false)}
        className='top-[4.05rem] left-0 w-full absolute flex flex-col bg-white dark:bg-gray-900 shadow rounded-b-sm border-b dark:border-gray-700'
        style={{
          opacity: !showDropDown ? '0' : '1',
          transition: '0.3s ease',
          visibility: !showDropDown ? 'hidden' : 'visible',
          transformOrigin: 'top',
        }}
      >
        <ul className='grid grid-cols-2 pb-10 pt-3 px-3 gap-3 h-screen md:h-auto'>
          <div className='grid grid-cols-1 text-start justify-start h-fit md:h-auto'>
            <h2 className='p-3 font-bold text-lg'>Guide</h2>
            <Link
              href='/guide/how-to-hire'
              className=' p-3 rounded-md h-fit mb-2  hover:bg-gray-100 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600'
            >
              <div className='text-sm font-bold'>How to Hire</div>
              <p className='text-gray-400 text-sm  opacity-80'>
                Post job, review offers, hire best freelancer.
              </p>
            </Link>
            <Link
              href='/guide/how-to-work'
              className='text-start p-3 rounded-md h-fit mb-2  hover:bg-gray-100 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600'
            >
              <div className='text-sm font-bold'>How to Work</div>
              <p className='text-gray-400 text-sm  opacity-80'>
                Learn how to grow your independent work.
              </p>
            </Link>
          </div>
          <div className='grid grid-cols-1 text-start justify-start h-fit '>
            <h2 className='p-3 font-bold text-lg'>Support</h2>
            <li className=' p-3 rounded-md hover:bg-gray-100 mb-2 cursor-pointer h-fit dark:bg-gray-700 dark:hover:bg-gray-600'>
              <div className='text-sm font-bold'>How to Contact Admins</div>
              <p className='text-gray-400 text-sm  opacity-80'>
                Email or call admin for user support.
              </p>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default GuideDropDown;
