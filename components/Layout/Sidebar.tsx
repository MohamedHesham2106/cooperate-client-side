import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaFileAlt } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { HiMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdCategory } from 'react-icons/md';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';

import { useAuthenticate } from '../../context/AuthProvider';
import { getUserData } from '../../utils/user';

interface IProps {
  isOpen: (open: boolean) => void;
}

const Sidebar: React.FC<IProps> = ({ isOpen }) => {
  const { SignOut, uuid, accessToken } = useAuthenticate();
  const [image, setImage] = useState<string | undefined>();
  const [user, setUser] = useState<IUser | undefined>();

  const fetchUser = useCallback(async () => {
    const user = await getUserData(uuid, accessToken);
    if (user) {
      //   console.log(user);
      setUser(user);
      setImage(user.imageUrl);
    }
  }, [accessToken, uuid]);
  useEffect(() => {
    fetchUser();

    return () => {
      setImage(undefined);
    };
  }, [fetchUser]);

  const logOutHandler = () => {
    SignOut();
  };

  const menus = [
    { name: 'Dashboard', link: '/dashboard', icon: MdOutlineDashboard },
    { name: 'User', link: '/dashboard/manage-users', icon: AiOutlineUser },
    {
      name: 'Analytics',
      link: '/dashboard/analytics',
      icon: TbReportAnalytics,
    },
    {
      name: 'Messages',
      link: '/dashboard/inbox',
      icon: FiMessageSquare,
      margin: true,
    },
    {
      name: 'Skills and Categories',
      link: '/dashboard/skills-categories',
      icon: MdCategory,
    },
    {
      name: 'Current Posted Jobs',
      link: '/dashboard/manage-jobs',
      icon: FaFileAlt,
    },
    {
      name: 'Setting',
      link: '/dashboard/settings',
      icon: RiSettings4Line,
      margin: true,
    },
  ];
  const [open, setOpen] = useState(true);

  return (
    <header className='flex gap-6 sticky top-0 left-0 h-screen'>
      <nav
        className={`bg-gray-900 min-h-screen relative ${
          open ? 'w-full' : 'w-16'
        } duration-500 text-gray-100 px-4`}
      >
        <div className='py-3 flex justify-end'>
          <HiMenuAlt3
            size={26}
            className='cursor-pointer'
            onClick={() => {
              setOpen(!open);
              isOpen(!open);
            }}
          />
        </div>
        <div className='mt-4 flex flex-col gap-4 relative'>
          {menus.map((menu, i) => (
            <Link
              href={menu.link}
              key={i}
              className={` ${
                menu.margin && 'mt-5'
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 capitalize overflow-hidden'
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white capitalize font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        {user && (
          <div className='absolute bottom-0 left-0 p-4 w-full flex gap-2 items-center'>
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

            <div
              style={{
                transitionDelay: '300ms',
              }}
              className={`flex flex-col gap-1 duration-500 ${
                !open && 'opacity-0 translate-x-28 capitalize overflow-hidden'
              }`}
            >
              <p className='text-sm'>
                {user.first_name} {user.last_name}
              </p>
              <p className='text-xs'>{user.email}</p>
            </div>
            <IoLogOutOutline
              size={25}
              onClick={logOutHandler}
              className='cursor-pointer'
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Sidebar;
