import { FC, MouseEvent, useState } from 'react';

interface IProps {
  job: IJobs;
  onClick: (id: string) => void;
  ModalHandler: (event: MouseEvent<HTMLDivElement>) => void;
}
const Job: FC<IProps> = ({ job, onClick, ModalHandler }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const date = new Date(job.project_length).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const handleClick = () => {
    onClick(job._id);
  };
  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    ModalHandler(event);
  };
  const truncatedDescription = job.description.slice(0, 200);
  const toggleDescription = () => setShowFullDescription(!showFullDescription);
  return (
    <div
      className='flex flex-col w-full my-3 p-4 gap-3 border rounded-lg shadow-md cursor-pointer'
      onClick={handleClick}
      onMouseDown={showModalHandler}
      data-modal-type='job'
    >
      <div className='font-semibold capitalize'>{job.title}</div>
      <div className='text-gray-400 text-sm capitalize'>
        Est. Budget: ${job.budget} - {job.experience_level} Level - Deadline:{' '}
        {date}
      </div>
      <div className='mt-2 text-sm'>
        {showFullDescription ? job.description : truncatedDescription}
        {job.description.length > 200 && (
          <button
            className='text-blue-500 hover:text-blue-600 font-semibold px-2'
            onClick={toggleDescription}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <div className='flex mt-2 gap-2 flex-wrap'>
        {job.skills.map((skill) => (
          <span
            key={skill._id}
            className='px-4 py-2 shadow  text-base rounded-3xl text-blue-500 font-semibold bg-blue-200 '
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Job;
