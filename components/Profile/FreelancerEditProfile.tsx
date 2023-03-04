import { FC, useState } from 'react';

import ChangePassword from '../Forms/ChangePassword';
import ContactInfo from '../Forms/ContactInfo';
import SkillsAndCategory from '../Forms/SkillsAndCategory';

interface IProps {
  user: IUser;
  categories: Category[];
}

const FreelancerEditProfile: FC<IProps> = ({ user }) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className='grid grid-cols-[2fr_5fr] p-1'>
      <ul className='flex flex-col'>
        <li>
          <a
            href='#'
            onClick={() => setOpenTab(1)}
            className={` ${
              openTab === 1 ? 'bg-blue-600 text-white' : ''
            } inline-block px-4 py-2 text-gray-600  shadow w-full`}
          >
            Contact Information
          </a>
        </li>
        <li>
          <a
            href='#'
            onClick={() => setOpenTab(2)}
            className={` ${
              openTab === 2 ? 'bg-blue-600 text-white' : ''
            } inline-block px-4 py-2 text-gray-600  shadow  w-full`}
          >
            Password &amp; Security
          </a>
        </li>
        <li>
          <a
            href='#'
            onClick={() => setOpenTab(3)}
            className={` ${
              openTab === 3 ? 'bg-blue-600 text-white' : ''
            } inline-block px-4 py-2 text-gray-600   shadow  w-full`}
          >
            Skills &amp; Categories
          </a>
        </li>
      </ul>
      <div className='p-3 bg-white border-l'>
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
