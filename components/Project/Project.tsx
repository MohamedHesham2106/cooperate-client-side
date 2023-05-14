import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { useModalManager } from '../../context/ModalManager';
import { getTimeDifference } from '../../utils/date';
interface IProps {
  project: IProject;
}
const Project: FC<IProps> = ({ project }) => {
  const { theme } = useTheme();
  const { displayModal } = useModalManager();

  // Function to handle showing the project modal
  const showModalHandler = () => {
    displayModal('project', {
      project,
    });
  };
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  // Update the 'createdAt' state when the 'project' prop changes
  useEffect(() => {
    // Calculate the time difference and set it as the creation time
    setCreatedAt(getTimeDifference(new Date(project.createdAt).getTime()));
  }, [project.createdAt]);

  // Calculate the completion percentage of milestones
  const percentage =
    (project.milestone.filter((m) => m.status === 'Complete').length /
      project.milestone.length) *
    100;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className='flex flex-col bg-white w-full my-3 p-4 gap-3 border border-gray-200 dark:bg-gray-800 dark:border-gray-800 rounded-2xl shadow-md cursor-pointer'
      onClick={showModalHandler}
    >
      <div className='flex flex-col min-w-full lg:flex-row mx-auto bg-white dark:bg-gray-800 rounded'>
        <div className='w-full lg:w-1/2 px-10 flex flex-col justify-between py-10'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-gray-800 dark:text-blue-500 capitalize  text-3xl tracking-normal font-semibold mb-1'>
              {project.job.title}
            </h2>

            <p className='text-gray-600 dark:text-white text-sm tracking-normal font-normal mb-8  w-full'>
              {project.job.description.length > 200
                ? `${project.job.description.slice(0, 200) + '...'}`
                : project.job.description}
            </p>
          </div>

          <div className='flex items-center justify-evenly flex-wrap'>
            <div className='flex items-center flex-col'>
              <h2 className='text-gray-600 dark:text-blue-500 font-bold    text-md leading-6 mb-2 text-center'>
                {project.job.budget}
              </h2>
              <p className='text-gray-800 dark:text-white text-sm leading-5'>
                $
              </p>
            </div>
            <div className='mx-6 lg:mx-3 xl:mx-6 px-8 lg:px-4 xl:px-8 border-l border-r flex flex-col items-center'>
              <h2 className='text-gray-600 capitalize font-bold dark:text-blue-500  text-md leading-6 mb-2 text-center'>
                {project.job.experience_level}
              </h2>
              <p className='text-gray-800 dark:text-white text-sm leading-5'>
                Level
              </p>
            </div>
            <div className='flex items-center flex-col'>
              <h2 className='text-gray-600 capitalize font-bold  dark:text-blue-500  text-md leading-6 mb-2 text-cente'>
                {createdAt}
              </h2>
              <p className='text-gray-800  text-sm leading-5 dark:text-white'>
                Published
              </p>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-1/2 px-6 border-t lg:border-t-0 lg:border-b-0 lg:border-l  border-gray-300 flex flex-col  py-10'>
          <div className='mb-3  flex items-center justify-center w-full cursor-pointer '>
            <div className=' w-24 h-24 '>
              {project.milestone.length > 0 ? (
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage.toFixed(1)}%`}
                  styles={{
                    path: { stroke: '#3b82f6', strokeLinecap: 'round' },
                    trail: {
                      stroke: `${theme !== 'dark' ? '#d6d6d6' : '#fff'}`,
                      strokeLinecap: 'round',
                    },
                    text: {
                      fontSize: '1.2rem',
                      fill: `${theme !== 'dark' ? '#000' : '#fff'}`,
                      fontWeight: '600',
                    },
                  }}
                />
              ) : (
                <p className='text-gray-600 dark:text-white text-sm tracking-normal font-normal mb-3 text-center'>
                  No Milestones set yet.
                </p>
              )}
            </div>
          </div>
          <h2 className='text-gray-800 dark:text-white text-xl tracking-normal text-center font-medium mb-1'>
            {project.milestone.length}
          </h2>
          <p className='text-gray-600 dark:text-white  text-sm tracking-normal font-normal mb-3 text-center'>
            Milestones
          </p>
          <div className='flex items-center justify-center'>
            <p
              className={`${
                project.project_status === 'Complete'
                  ? 'bg-green-400'
                  : 'bg-blue-400'
              } px-10 py-2 rounded-md w-1/3 text-white  text-sm tracking-normal font-normal mb-8 text-center`}
            >
              {project.project_status}
            </p>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            {project.job.skills.map((skill: ISkill) => {
              return (
                <div
                  className='bg-blue-500 text-white text-center  rounded-full shadow-md text-xs leading-3 min-w-[150px] py-3 px-2'
                  key={skill._id}
                >
                  {skill.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
