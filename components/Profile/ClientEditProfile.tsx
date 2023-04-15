import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import ChangePassword from '../Forms/User Forms/ChangePassword';
import ContactInfo from '../Forms/User Forms/ContactInfo';

interface IProps {
  user: IUser;
}

const ClientEditProfile: FC<IProps> = ({ user }) => {
  const [openTab, setOpenTab] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const tab = router.query.tab;
    if (tab === 'contact') {
      setOpenTab(1);
    } else if (tab === 'security') {
      setOpenTab(2);
    }
  }, [router.query]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className='grid grid-cols-1 w-full md:grid-cols-[2fr_5fr] p-1'
    >
      <ul className='md:flex md:flex-col grid grid-cols-2 gap-1 p-2'>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'contact' },
            }}
            prefetch={false}
            scroll={false}
            className={` ${
              openTab === 1 ? 'bg-blue-500 text-white' : 'text-black dark:text-white dark:bg-gray-700 '
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 `}
          >
            Contact Information
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'security' },
            }}
            prefetch={false}
            scroll={false}
            className={` ${
              openTab === 2 ? 'bg-blue-500 text-white' : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            Password &amp; Security
          </Link>
        </li>
      </ul>
      <div className='p-3 bg-white md:border-l dark:bg-gray-800 dark:border-gray-700'>
        <div className={openTab === 1 ? 'block' : 'hidden'}>
          <ContactInfo user={user} />
        </div>
        <div className={openTab === 2 ? 'block' : 'hidden'}>
          <ChangePassword user={user} />
        </div>
      </div>
    </motion.div>
  );
};

export default ClientEditProfile;
