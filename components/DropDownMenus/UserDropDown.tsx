import Image from 'next/image';
import Link from 'next/link';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { ImUser } from 'react-icons/im';
import { SlLogout, SlSettings } from 'react-icons/sl';
import useSWR from 'swr';

import { AuthContext } from '../../context/AuthContext';
import { fetcher } from '../../utils/axios';
import { getCookie, getPayloadFromToken } from '../../utils/cookie';

const tokenPayload = getPayloadFromToken(getCookie('jwt_access'));

const UserDropDown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { SignOut } = useContext(AuthContext);
  const [image, setImage] = useState<string | undefined>();

  const userURL = `/${tokenPayload?.role}/~${tokenPayload?.sub}`;

  const { data } = useSWR(`/api/user/${tokenPayload?.sub}`, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      setImage(data.user.imageUrl);
    }
  }, [data]);

  const logOutHandler = () => {
    SignOut();
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
        className='flex flex-row items-center w-full text-sm text-left bg-transparent rounded-full md:w-auto md:mt-0 md:ml-2 hover:ring-2 hover:ring-gray-200 focus:outline-none focus:shadow-outline'
      >
        {image ? (
          <Image
            src={image}
            width={35}
            height={35}
            className='rounded-full'
            alt={image}
          />
        ) : (
          <HiOutlineUserCircle size={35} />
        )}
      </button>

      <div
        className='absolute right-5 w-48 mt-1 origin-top-right rounded-md shadow-lg'
        style={{
          opacity: !isOpen ? '0' : '1',
          transition: '0.3s ease',
          visibility: !isOpen ? 'hidden' : 'visible',
          transform: !isOpen ? 'scale(0.9)' : 'scale(1)',
          transformOrigin: 'top right',
        }}
      >
        <div className='px-2 py-2 bg-white rounded-md shadow-sm border'>
          <Link
            className='flex rounded-full items-center gap-2 px-4 py-2 mt-2  bg-transparent  text-base font-medium md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
            href={userURL}
          >
            <span>
              <ImUser size={20} />
            </span>
            <span>Profile</span>
          </Link>
          <Link
            className='flex  rounded-full items-center gap-2 px-4 py-2 mt-2  bg-transparent   text-base font-medium md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
            href={`${userURL}/settings`}
          >
            <span className='pt-1'>
              <SlSettings size={20} />
            </span>
            <span>Settings</span>
          </Link>
          <Link
            href='/chat'
            className='cursor-pointer  rounded-full flex items-center gap-2 px-4 py-2 mt-2  bg-transparent text-base font-medium md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
          >
            <span className='pt-1'>
              <AiFillWechat size={25} />
            </span>
            <span>Chat</span>
          </Link>
          <Link
            href='/'
            onClick={logOutHandler}
            className='cursor-pointer  rounded-full flex items-center gap-2 px-4 py-2 mt-2  bg-transparent text-base font-medium md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
          >
            <span className='pt-1'>
              <SlLogout size={18} />
            </span>
            <span>Log out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserDropDown;
