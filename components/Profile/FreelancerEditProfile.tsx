import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import ChangePassword from '../Forms/User Forms/ChangePassword';
import ContactInfo from '../Forms/User Forms/ContactInfo';
import DeleteAccountForm from '../Forms/User Forms/DeleteAccountForm';
import IdentityVerification from '../Forms/User Forms/IdentityVerification';
import PersonalProjectsForm from '../Forms/User Forms/PersonalProjectsForm ';
import SkillsAndCategory from '../Forms/User Forms/SkillsAndCategory';

interface IProps {
  user: IUser;
}

const FreelancerEditProfile: FC<IProps> = ({ user }) => {
  // Define state for the open tab
  const [openTab, setOpenTab] = useState(1);

  // Get the router instance
  const router = useRouter();

  // Update the open tab based on the router query parameter
  useEffect(() => {
    // Get the value of the 'tab' query parameter from the router
    const tab = router.query.tab;

    // Set the open tab based on the value of the 'tab' query parameter
    switch (tab) {
      case 'contact':
        setOpenTab(1);
        break;
      case 'security':
        setOpenTab(2);
        break;
      case 'skills&categories':
        setOpenTab(3);
        break;
      case 'personal-projects':
        setOpenTab(4);
        break;
      case 'delete-account':
        setOpenTab(5);
        break;
      case 'identity-verification':
        setOpenTab(6);
        break;
      default:
        // Handle any other cases here
        break;
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
      <ul className='md:flex md:flex-col grid grid-cols-3 gap-1 p-2 '>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'contact' },
            }}
            prefetch={false}
            scroll={false}
            className={` ${
              openTab === 1
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            Contact Information
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/freelancer/~${user._id}/settings`,
              query: { tab: 'security' },
            }}
            prefetch={false}
            scroll={false}
            className={` ${
              openTab === 2
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            Password &amp; Security
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'skills&categories' },
            }}
            scroll={false}
            prefetch={false}
            className={` ${
              openTab === 3
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            Skills &amp; Categories
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'personal-projects' },
            }}
            scroll={false}
            prefetch={false}
            className={` ${
              openTab === 4
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            Personal Projects
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'delete-account' },
            }}
            scroll={false}
            prefetch={false}
            className={` ${
              openTab === 5
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            Delete Account
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/${user.role}/~${user._id}/settings`,
              query: { tab: 'identity-verification' },
            }}
            scroll={false}
            prefetch={false}
            className={` ${
              openTab === 6
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white dark:bg-gray-700'
            }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500`}
          >
            ID Verification
          </Link>
        </li>
      </ul>
      <div className='p-3 bg-white md:border-l dark:bg-gray-800 dark:border-gray-700'>
        {openTab === 1 && (
          <div className={openTab === 1 ? 'block' : 'hidden'}>
            <ContactInfo user={user} />
          </div>
        )}
        {openTab === 2 && (
          <div className={openTab === 2 ? 'block' : 'hidden'}>
            <ChangePassword />
          </div>
        )}
        {openTab === 3 && (
          <div className={openTab === 3 ? 'block' : 'hidden'}>
            <SkillsAndCategory user={user} />
          </div>
        )}
        {openTab === 4 && (
          <div className={openTab === 4 ? 'block' : 'hidden'}>
            <PersonalProjectsForm user={user} />
          </div>
        )}
        {openTab === 5 && (
          <div className={openTab === 5 ? 'block' : 'hidden'}>
            <DeleteAccountForm />
          </div>
        )}
        {openTab === 6 && (
          <div className={openTab === 6 ? 'block' : 'hidden'}>
            <IdentityVerification />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FreelancerEditProfile;
