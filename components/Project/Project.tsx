import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { getTimeDifference } from '../../utils/date';
import { fadeIn } from '../../utils/variants';
import { motion } from 'framer-motion';

interface IProps {
  project: IProject;
  onClick: (project: IProject) => void;
  ModalHandler: (event: MouseEvent<HTMLDivElement>) => void;
}
const Project: FC<IProps> = ({ project, onClick, ModalHandler }) => {
  const handleClick = () => {
    onClick(project);
  };
  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    ModalHandler(event);
  };
  const [createdAt, setCreatedAt] = useState<string | undefined>();
  useEffect(() => {
    setCreatedAt(getTimeDifference(new Date(project.createdAt).getTime()));
  }, [project.createdAt]);

  const percentage =
    (project.milestone.filter((m) => m.status === 'Complete').length /
      project.milestone.length) *
    100;
  const variants = useMemo(() => fadeIn('up', 0.5), []);
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.3 }}
      className='flex flex-col w-full my-3 p-4 gap-3 border border-gray-200 rounded-3xl shadow-md cursor-pointer'
      onClick={handleClick}
      onMouseDown={showModalHandler}
      data-modal-type='project'
    >
      <div className='flex justify-between items-center border-b border-gray-300 px-2 pb-3 flex-wrap'>
        <div className='font-bold capitalize text-xl'>{project.job.title}</div>

        {project.milestone.length > 0 && (
          <div className='w-16 h-16'>
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(1)}%`}
              styles={{
                path: { stroke: '#3b82f6' },
                text: {
                  fontSize: '1.2rem',
                  fill: '#000',
                  fontWeight: '600',
                },
              }}
            />
          </div>
        )}
      </div>

      <div className='flex  border-b border-gray-300 pb-4 pt-2 gap-2 flex-wrap'>
        {project.job.skills?.map((skill: ISkill) => (
          <span
            key={skill._id}
            className='px-4 py-2 shadow  text-sm rounded-3xl text-blue-500 font-medium bg-blue-200 '
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className='flex justify-between px-5 items-center'>
        <span>${project.job.budget.toFixed(2)}</span>
        <span>
          Status:{' '}
          <span
            className={`${
              project.project_status === 'In progress'
                ? 'text-blue-400'
                : 'text-green-500'
            }`}
          >
            {project.project_status}
          </span>
        </span>

        <span className='text-gray-400 text-xs'>{createdAt}</span>
      </div>
    </motion.div>
  );
};

export default Project;
