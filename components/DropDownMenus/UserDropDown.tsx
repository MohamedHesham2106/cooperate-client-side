import { useAppDispatch } from 'hooks/useRedux';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { ImUser } from 'react-icons/im';
import { SlLogout, SlSettings } from 'react-icons/sl';

import actions from '../../redux/actions';

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(actions.deauthenticate());
  };
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent rounded-full md:w-auto md:mt-0 md:ml-2 hover:ring-2 hover:ring-gray-200 focus:outline-none focus:shadow-outline'
      >
        <BiUserCircle size={35} />
      </button>
      {isOpen && (
        <div className='absolute right-0 w-48 mt-1 origin-top-right rounded-md shadow-lg'>
          <div className='px-2 py-2 bg-white rounded-md shadow-sm border'>
            <Link
              className='flex items-center gap-2 px-4 py-2 mt-2  bg-transparent   text-base font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
              href='#'
            >
              <span className='pt-1'>
                <ImUser size={20} />
              </span>
              <span>Profile</span>
            </Link>
            <Link
              className='flex items-center gap-2 px-4 py-2 mt-2  bg-transparent   text-base font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
              href='#'
            >
              <span className='pt-1'>
                <SlSettings size={20} />
              </span>
              <span>Settings</span>
            </Link>
            <a
              onClick={logOutHandler}
              className='flex items-center gap-2 px-4 py-2 mt-2  bg-transparent text-base font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
            >
              <span className='pt-1'>
                <SlLogout size={18} />
              </span>
              <span>Log out</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserDropDown;
