import Image from 'next/image';
import Link from 'next/link';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { ImUser } from 'react-icons/im';
import { SlLogout, SlSettings } from 'react-icons/sl';

import NotificationDropDown from '../DropDownMenus/NotificationDropDown';
import UserDropDown from '../DropDownMenus/UserDropDown';
import { AuthContext } from '../../context/AuthContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import {
  getCookie,
  getPayloadFromToken,
  isAuthenticated,
} from '../../utils/cookie';
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const MainNavigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [role, setRole] = useState<string>();

  const scrollPosition = useScrollPosition();
  const checkAuthentication = isAuthenticated();
  const { SignOut } = useContext(AuthContext);

  const logOutHandler = () => {
    SignOut();
  };

  const tokenPayload = getPayloadFromToken(getCookie('jwt_refresh'));
  const userURL = `/${tokenPayload?.role}/~${tokenPayload?.sub}`;
  useEffect(() => {
    setIsAuth(checkAuthentication);
  }, [checkAuthentication]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setRole(
      isAuthenticated()
        ? getPayloadFromToken(getCookie('jwt_refresh')).role
        : undefined
    );
  }, []);

  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'shadow' : 'shadow-none',
        `transition-shadow fixed top-0 left-0 z-10 w-full bg-white`
      )}
    >
      <nav className='w-full bg-white max-h-16'>
        <div className='justify-between mx-auto max-w-full md:items-center md:flex md:px-8'>
          <div>
            <div className='flex items-center h-16 justify-between py-3 md:py-5 md:block'>
              <div className=' pt-2 h-full flex items-center'>
                <Link href='/'>
                  <Image
                    src='/logo.png'
                    alt='Cooperate Logo'
                    width={140}
                    height={140}
                    priority
                  />
                </Link>
              </div>
              <div className='md:hidden'>
                <button
                  className='p-2 text-gray-700 rounded-md outline-none '
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 text-black'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 text-black'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center bg-white pb-3  md:block md:pb-0 md:mt-0  ${
                isOpen ? 'block p-6 shadow-xl' : 'hidden'
              }`}
            >
              {isAuth && (
                <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-normal text-lg md:text-base'>
                  <li className='text-gray-900 hover:text-blue-500 text-center'>
                    <Link href='/'>Home</Link>
                  </li>
                  <li className='text-gray-900 hover:text-blue-500 text-center'>
                    <Link href='/jobs'>Jobs</Link>
                  </li>
                  {role === 'client' && (
                    <li className='text-gray-900 hover:text-blue-500 text-center'>
                      <Link href={`/proposals/~${tokenPayload?.sub}`}>
                        Proposals
                      </Link>
                    </li>
                  )}
                  {role === 'freelancer' && (
                    <li className='text-gray-900 hover:text-blue-500 text-center'>
                      <Link href='#'>Invitations</Link>
                    </li>
                  )}
                  <li className='text-gray-900 hover:text-blue-500 text-center'>
                    <Link href={`/ongoing-projects/~${tokenPayload?.sub}`}>
                      Projects
                    </Link>
                  </li>
                </ul>
              )}

              <div
                className={`mt-3 space-y-2 md:hidden ${
                  !isAuth
                    ? 'inline-block'
                    : 'flex flex-col justify-between items-center'
                }  w-full`}
              >
                {!isAuth && (
                  <Link
                    href='/oauth'
                    className='inline-block w-full px-4 py-2 text-center text-white bg-blue-500 rounded-md shadow hover:bg-blue-800'
                  >
                    Log In
                  </Link>
                )}
                {isAuth && (
                  <Fragment>
                    <Link
                      href={userURL}
                      className='flex items-center justify-center gap-2 text-lg w-full  px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'
                    >
                      <ImUser size={20} className='mb-1' />
                      Profile
                    </Link>
                    <Link
                      href={`${userURL}/settings`}
                      className='flex items-center justify-center gap-2 text-lg w-full  px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'
                    >
                      <SlSettings />
                      Settings
                    </Link>
                    <Link
                      href='/'
                      onClick={logOutHandler}
                      className='flex items-center justify-center gap-2 text-lg w-full  px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'
                    >
                      <SlLogout />
                      LogOut
                    </Link>
                  </Fragment>
                )}
                {!isAuth && (
                  <Link
                    href='/signup'
                    className='inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
                  >
                    Sign up
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className='hidden space-x-2 md:inline-block'>
            {!isAuth && (
              <Link
                href='/oauth'
                className='px-4 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-800'
              >
                Log In
              </Link>
            )}
            {isAuth && (
              <div className='flex md:pr-5 items-center'>
                <NotificationDropDown />
                <UserDropDown />
              </div>
            )}
            {!isAuth && (
              <Link
                href='/signup'
                className='px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
