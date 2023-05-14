import { motion } from 'framer-motion';
import React, { MouseEvent, useState } from 'react';

import ChangePassword from '../../Forms/User Forms/ChangePassword';
import ContactInfo from '../../Forms/User Forms/ContactInfo';
import SkillsAndCategory from '../../Forms/User Forms/SkillsAndCategory';
import Container from '../../UI/Container';
import Modal from '../../UI/Modal';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  user: IUser;
}
const EditUser: React.FC<IProps> = ({ user, onClose }) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <Modal className='' onClose={onClose} fullScreen>
      <Container className='w-11/12 mx-auto my-24 border border-gray-300 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700'>
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
              <div
                onClick={() => setOpenTab(1)}
                className={` ${
                  openTab === 1
                    ? 'bg-blue-500 text-white'
                    : 'text-black dark:text-white dark:bg-gray-700 '
                }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 `}
              >
                Contact Information
              </div>
            </li>
            <li>
              <div
                onClick={() => setOpenTab(2)}
                className={` ${
                  openTab === 1
                    ? 'bg-blue-500 text-white'
                    : 'text-black dark:text-white dark:bg-gray-700 '
                }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 `}
              >
                Password &amp; Security
              </div>
            </li>
            {user.role === 'freelancer' && (
              <li>
                <div
                  onClick={() => setOpenTab(3)}
                  className={` ${
                    openTab === 1
                      ? 'bg-blue-500 text-white'
                      : 'text-black dark:text-white dark:bg-gray-700 '
                  }  inline-block px-4 py-2  shadow  w-full cursor-pointer md:rounded-sm rounded-full text-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 `}
                >
                  Skills &amp; Categories
                </div>
              </li>
            )}
          </ul>
          <div className='p-3 bg-white md:border-l dark:bg-gray-800 dark:border-gray-700'>
            <div className={openTab === 1 ? 'block' : 'hidden'}>
              <ContactInfo user={user} />
            </div>
            <div className={openTab === 2 ? 'block' : 'hidden'}>
              <ChangePassword user={user} />
            </div>
            {user.role === 'freelancer' && (
              <div className={openTab === 3 ? 'block' : 'hidden'}>
                <SkillsAndCategory user={user} />
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </Modal>
  );
};

export default EditUser;
