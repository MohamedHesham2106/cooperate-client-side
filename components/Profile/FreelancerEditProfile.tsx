import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import ChangePassword from '../Forms/User Forms/ChangePassword';
import ContactInfo from '../Forms/User Forms/ContactInfo';
import SkillsAndCategory from '../Forms/User Forms/SkillsAndCategory';

interface IProps {
  user: IUser;
}

const FreelancerEditProfile: FC<IProps> = ({ user }) => {
  const [openTab, setOpenTab] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const tab = router.query.tab;
    if (tab === 'contact') {
      setOpenTab(1);
    } else if (tab === 'security') {
      setOpenTab(2);
    } else if (tab === 'skills&categories') {
      setOpenTab(3);
    }
  }, [router.query]);

  return (
    <div className='grid grid-cols-1 w-full md:grid-cols-[2fr_5fr] p-1'>
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
              openTab === 1 ? 'bg-blue-500 text-white' : 'text-black'
            } inline-block px-4 py-2 text-sm md:text-base  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white`}
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
              openTab === 2 ? 'bg-blue-500 text-white' : 'text-black'
            } inline-block px-4 py-2  shadow text-sm md:text-base  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white`}
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
              openTab === 3 ? 'bg-blue-500 text-white' : 'text-black'
            } inline-block px-4 py-2  shadow text-sm md:text-base  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white`}
          >
            Skills &amp; Categories
          </Link>
        </li>
      </ul>
      <div className='p-3 bg-white md:border-l'>
        <div className={openTab === 1 ? 'block' : 'hidden'}>
          <ContactInfo user={user} />
        </div>
        <div className={openTab === 2 ? 'block' : 'hidden'}>
          <ChangePassword user={user} />
        </div>
        <div className={openTab === 3 ? 'block' : 'hidden'}>
          <SkillsAndCategory user={user} />
        </div>
      </div>
    </div>
  );
};

export default FreelancerEditProfile;
