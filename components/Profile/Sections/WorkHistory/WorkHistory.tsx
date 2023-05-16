import React, { FC, useState } from 'react';

import { useModalManager } from '../../../../context/ModalManager';
interface IProps {
  workHistory: IProject;
}
const WorkHistory: FC<IProps> = ({ workHistory }) => {
  const { displayModal } = useModalManager();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const date = new Date(workHistory.job.project_length).toLocaleString(
    'en-GB',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );
  const showModalHandler = () => {
    displayModal('history', {
      project: workHistory,
    });
  };
  const truncatedDescription = workHistory.job.description.slice(0, 200);
  const toggleDescription = () => setShowFullDescription(!showFullDescription);
  return (
    <div
      className='flex flex-col w-full my-3  gap-3 border rounded-lg shadow-md dark:shadow-gray-900 cursor-pointer dark:bg-gray-700 dark:border-gray-700'
      onClick={showModalHandler}
    >
      <div className='font-bold p-5 capitalize dark:text-white rounded-t-lg dark:bg-gray-900 leading-3'>
        {workHistory.job.title}
      </div>
      <div className='text-gray-400 px-4 text-sm font-thin capitalize dark:text-white'>
        Est. Budget: ${workHistory.job.budget} -{' '}
        {workHistory.job.experience_level} Level - Deadline: {date}
      </div>
      <div className='mt-2 px-4 text-sm'>
        {showFullDescription
          ? workHistory.job.description
          : truncatedDescription}
        {workHistory.job.description.length > 200 && (
          <button
            className='text-blue-500 hover:text-blue-600 font-medium px-2'
            onClick={toggleDescription}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <div className='flex mt-2 gap-2 pb-4 flex-wrap px-4'>
        {workHistory.job.skills.map((skill) => (
          <span
            key={skill._id}
            className='px-4 py-2 shadow  text-sm rounded-3xl text-blue-500 font-medium bg-blue-200  '
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
