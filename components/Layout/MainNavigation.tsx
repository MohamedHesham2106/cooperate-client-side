import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

import NotificationDropDown from '../DropDownMenus/NotificationDropDown';
import UserDropDown from '../DropDownMenus/UserDropDown';
import ThemeIcon from '../SVG/ThemeIcon';
import { AuthContext } from '../../context/AuthContext';
import { useAuthenticate } from '../../context/AuthProvider';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { isAuthenticated } from '../../utils/cookie';
import { getRole } from '../../utils/user';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const MainNavigation: FC = () => {
  const router = useRouter();
  console.log(router.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [role] = useState<string | undefined>(getRole() || undefined);
  const { uuid } = useAuthenticate();
  const scrollPosition = useScrollPosition();
  const checkAuthentication = isAuthenticated();
  const { SignOut } = useContext(AuthContext);

  const logOutHandler = () => {
    SignOut();
  };

  const userURL = `/${role}/~${uuid}`;
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
  return (
    <header
      className={classNames(
        scrollPosition > 0
          ? 'shadow dark:shadow-gray-800 bg-white dark:bg-gray-900'
          : 'shadow-none md:bg-transparent bg-white dark:md:bg-transparent dark:bg-gray-900',
        `transition-shadow fixed top-0 left-0 z-10 w-full `
      )}
    >
      <nav className='w-full  max-h-16'>
        <div className='justify-between mx-auto max-w-full md:items-center md:flex md:px-8'>
          <div>
            <div className='flex items-center h-16 justify-between py-3 md:py-5 md:block '>
              <div className=' pt-2 h-full flex items-center '>
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
                    <IoCloseOutline size={35} className='dark:text-white' />
                  ) : (
                    <HiMenuAlt3 size={35} className='dark:text-white' />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center md:bg-transparent bg-white dark:bg-gray-900 pb-3  md:block md:pb-0 md:mt-0  ${
                isOpen ? 'block p-6 shadow-xl' : 'hidden'
              }`}
            >
              {isAuth && (
                <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-normal text-lg md:text-base'>
                  <li
                    className={` hover:text-blue-500 dark:hover:text-blue-500 text-center  ${
                      router.pathname === '/'
                        ? 'text-blue-500 dark:text-blue-500'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <Link
                      href='/'
                      onClick={(e) => {
                        router.pathname === '/' && e.preventDefault();
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className={` hover:text-blue-500 dark:hover:text-blue-500 text-center  ${
                      router.pathname === '/jobs'
                        ? 'text-blue-500 dark:text-blue-500'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <Link
                      href='/jobs'
                      onClick={(e) => {
                        router.pathname === '/jobs' && e.preventDefault();
                      }}
                    >
                      Jobs
                    </Link>
                  </li>
                  {role === 'client' && (
                    <li
                      className={` hover:text-blue-500 dark:hover:text-blue-500 text-center  ${
                        router.pathname.includes('/proposals/')
                          ? 'text-blue-500 dark:text-blue-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      <Link
                        href={`/proposals/~${uuid}`}
                        onClick={(e) => {
                          router.pathname.includes('/proposals/') &&
                            e.preventDefault();
                        }}
                      >
                        Proposals
                      </Link>
                    </li>
                  )}
                  {role === 'freelancer' && (
                    <li
                      className={` hover:text-blue-500 dark:hover:text-blue-500 text-center  ${
                        router.pathname.includes('/invitation/received/')
                          ? 'text-blue-500 dark:text-blue-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      <Link
                        href={`/invitation/received/~${uuid}`}
                        onClick={(e) => {
                          router.pathname.includes('/invitation/received/') &&
                            e.preventDefault();
                        }}
                      >
                        Invitations
                      </Link>
                    </li>
                  )}
                  <li
                    className={` hover:text-blue-500 dark:hover:text-blue-500 text-center  ${
                      router.pathname.includes('/ongoing-projects/')
                        ? 'text-blue-500 dark:text-blue-500'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <Link
                      href={`/ongoing-projects/~${uuid}`}
                      onClick={(e) => {
                        router.pathname.includes('/ongoing-projects/') &&
                          e.preventDefault();
                      }}
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              )}

              <div
                className={`mt-3 space-y-2  md:hidden ${
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
                  <div className='pt-6  w-full flex flex-col space-y-8 md:flex md:space-x-6 md:space-y-0 font-normal text-lg md:text-base '>
                    <Link
                      href={userURL}
                      className='text-gray-900 hover:text-blue-500 dark:hover:text-blue-500 text-center dark:text-white'
                    >
                      Profile
                    </Link>
                    <Link
                      href='/chat'
                      className='text-gray-900 hover:text-blue-500 dark:hover:text-blue-500 text-center dark:text-white'
                    >
                      Chat
                    </Link>
                    <Link
                      href={`${userURL}/settings`}
                      className='text-gray-900 hover:text-blue-500 dark:hover:text-blue-500 text-center dark:text-white'
                    >
                      Settings
                    </Link>
                    <Link
                      href='/'
                      onClick={logOutHandler}
                      className='text-gray-900 hover:text-blue-500 dark:hover:text-blue-500 text-center dark:text-white'
                    >
                      LogOut
                    </Link>
                  </div>
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
          <div className='hidden gap-x-2 md:flex items-center'>
            <div>
              <ThemeIcon />
            </div>

            {!isAuth && (
              <Link
                href='/oauth'
                className='px-4 py-2 text-white  bg-blue-500 rounded-md shadow hover:bg-blue-800'
              >
                Log In
              </Link>
            )}
            {isAuth && (
              <div className='flex md:pr-5 gap-3 items-center'>
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
