import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../UI/Button';
import axiosInstance from '../../utils/axios';
import { getTimeDifference } from '../../utils/date';

interface IProps {
  milestone: IMilestone;
  role: 'freelancer' | 'client' | undefined;
}
const Milestone: FC<IProps> = ({ milestone, role }) => {
  const [updatedAt, setUpdatedAt] = useState<string | undefined>();
  useEffect(() => {
    if (milestone) {
      setUpdatedAt(getTimeDifference(new Date(milestone.updatedAt).getTime()));
    }
  }, [milestone.updatedAt, milestone]);
  const handleMarkAsDone = () => {
    axiosInstance
      .put(`/api/milestone/${milestone._id}`, { status: 'Complete' })
      .then((_response) => {
        // Handle the successful response here
        toast.success(
          `${milestone.title.charAt(0).toUpperCase()}${milestone.title.slice(
            1
          )} Complete.`
        );
      })
      .catch((_error) => {
        // Handle the error response here
        toast.error('Something went wrong.', {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      });
  };
  return (
    <div
      className={`grid ${
        role === 'freelancer' ? 'grid-cols-4' : 'grid-cols-3'
      } text-sm capitalize items-center justify-between text-center bg-blue-400 dark:bg-gray-400 text-white p-2  rounded-lg shadow `}
    >
      <span>{milestone.title}</span>
      <span>{milestone.status}</span>
      <span>{updatedAt}</span>
      {role === 'freelancer' && milestone.status === 'Pending' && (
        <Button
          onClick={handleMarkAsDone}
          type='button'
          className='px-2.5 py-1 bg-orange-400 hover:bg-orange-500   dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full'
        >
          Mark as Done
        </Button>
      )}
    </div>
  );
};

export default Milestone;
