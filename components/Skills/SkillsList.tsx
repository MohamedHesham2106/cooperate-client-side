import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import axiosInstance from '../../utils/axios';
import { fadeIn } from '../../utils/variants';

const SkillsList: FC = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const fetchSkills = useCallback(async () => {
    try {
      const data = (await axiosInstance.get('/api/skill')).data;
      setSkills(data.skills);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);
  const variants = useMemo(() => fadeIn('down', 0.7), []);
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.5 }}
      className='container grid md:grid-cols-[2fr_5fr] grid-cols-1 gap-x-60'
    >
      <div className='hidden md:block font-semibold text-5xl pl-10  text-blue-500'>
        <h2 className='py-1'>Top skills</h2>
        <h2 className='opacity-50 py-1'>Trending skills</h2>
      </div>
      <div className='container mx-auto grid grid-cols-2  py-6 gap-8'>
        {skills.slice(0, 20).map((skill: ISkill) => {
          return (
            <Link
              href={`/jobs?skills=${skill.name}`}
              className='text-gray-500 text-2xl md:pl-16 text-center md:text-start  font-semibold hover:text-blue-400 cursor-pointer'
              key={skill._id}
            >
              {skill.name}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillsList;
