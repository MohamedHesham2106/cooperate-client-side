import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

import FreelancerList from './FreelancerList';
import { fadeIn } from '../../utils/variants';
interface IProps {
  freelancers: IUser[];
}
const Freelancers: React.FC<IProps> = ({ freelancers }) => {
  const variants = useMemo(() => fadeIn('down', 0.7), []);
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='show'
      className='w-11/12 mx-auto p-5 border rounded-md flex flex-col gap-y-5 dark:bg-gray-700 dark:border-none'
    >
      <h1 className='p-5 text-center text-3xl bg-blue-500 text-white dark:bg-gray-900 mb-5 rounded-md shadow ring-1 ring-blue-500 ring-offset-1 font-black dark:ring-gray-900 '>
        Top 50 Freelancers
      </h1>
      <FreelancerList freelancers={freelancers} />
    </motion.div>
  );
};

export default Freelancers;
