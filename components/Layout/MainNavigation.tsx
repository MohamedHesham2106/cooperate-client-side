import Search from 'components/UI/Search/Search';
import { useScrollPosition } from 'hooks/useScrollPosition';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const MainNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const scrollPosition = useScrollPosition();

  //  logOutHandler = () => {
  //     onLogout();
  //   };
  const NavHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'shadow' : 'shadow-none',
        'transition-shadow fixed top-0 left-0 z-10 w-full bg-white '
      )}
    >
      <nav className='sm:justify-between h-16 max-w-full flex  items-center p-4 text-black'>
        <div className='block sm:hidden z-10 cursor-pointer'>
          {isOpen ? (
            <AiOutlineClose size={28} color='black' onClick={NavHandler} />
          ) : (
            <AiOutlineMenu size={28} color='black' onClick={NavHandler} />
          )}
        </div>
        <Link href='/' className='md:pl-24 pt-2'>
          <Image
            src='/logo.png'
            alt='Cooperate Logo'
            width={140}
            height={140}
          />
        </Link>

        {/* Search */}
        <div className='relative sm:w-1/4 w-2/3 sm:block'>
          <Search />
        </div>

        {/* Menu */}
        <ul className='hidden sm:flex  md:pr-24'>
          {!isAuth && (
            <li className='p-4'>
              <Link href='/auth'>Log In</Link>
            </li>
          )}

          {!isAuth && (
            <li className='p-4'>
              <Link
                href='/signup'
                className='px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200'
              >
                Sign Up
              </Link>
            </li>
          )}
          {isAuth && (
            <li className='p-4'>
              <Link
                href='/auth'
                // onClick={logOutHandler}
                className='px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200'
              >
                logOut
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {/* Mobile Menu */}
      <div
        className={
          isOpen
            ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
            : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
        }
      >
        <ul className='w-full'>
          <li className='p-4 text-2xl hover:text-blue-400'>
            <Link href='/auth' onClick={NavHandler}>
              Log In
            </Link>
          </li>

          <li className='mx-5 text-2xl flex-shrink-0 px-4 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200'>
            <Link href='/signup' onClick={NavHandler}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
