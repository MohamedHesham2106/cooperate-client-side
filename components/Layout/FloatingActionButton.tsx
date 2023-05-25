import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

import { useAuthenticate } from '../../context/AuthProvider';
import { getRole } from '../../utils/user';

const FloatingActionButton: FC = () => {
  const [showButton, setShowButton] = useState(false);
  const { uuid } = useAuthenticate();
  const [role, setRole] = useState<string | undefined>();
  useEffect(() => {
    setRole(getRole());
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fragment>
      {role === 'client' ? (
        <Link
          href={`/client/~${uuid}/job-post`}
          className='w-44 fixed z-[9999] bottom-5 right-5 bg-blue-500 p-2 rounded-md drop-shadow-lg flex justify-center items-center text-white text-base hover:bg-blue-600 hover:drop-shadow-2xl'
        >
          Post a Job
        </Link>
      ) : (
        <button
          title='Scroll Up'
          className={`fixed z-[9999] bottom-10 right-8 bg-blue-500 p-2 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-orange-600 hover:drop-shadow-2xl ${
            showButton ? '' : 'hidden'
          }`}
          onClick={handleClick}
        >
          <HiArrowUp size={20} />
        </button>
      )}
    </Fragment>
  );
};

export default FloatingActionButton;
