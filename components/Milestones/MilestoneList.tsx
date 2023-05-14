import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';

import Milestone from './Milestone';
import Button from '../UI/Button';
import Input from '../UI/Input';
import axiosInstance from '../../utils/axios';

interface IMilestoneInput {
  title: string;
}

interface IProps {
  role: 'freelancer' | 'client' | 'admin' | undefined;
  projectId: string;
  milestones: IMilestone[];
  isComplete: boolean;
}

const MilestoneList: FC<IProps> = ({
  projectId,
  milestones = [],
  role,
  isComplete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newMilestones, setNewMilestones] = useState<IMilestoneInput[]>([]);
  const router = useRouter();

  // Function to add a new milestone
  const addMilestone = () => {
    setShowForm(true);
    setNewMilestones([...newMilestones, { title: '' }]);
    console.log(newMilestones);
  };

  // Function to handle input change for a milestone
  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const list = [...newMilestones];
    list[index]['title'] = value;
    setNewMilestones(list);
  };

  // Function to handle saving new milestones
  const handleSave = async () => {
    // Loop through newMilestones array and send each title to the backend
    for (const milestone of newMilestones) {
      const response = await axiosInstance.post(`/api/milestone/${projectId}`, {
        title: milestone.title,
      });
      if (response.status !== 201) {
        // handle error
        toast.error('Something went wrong.', {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
        return;
      }
    }
    toast.success('New Milestones are added.');
    // Clear newMilestones array
    setNewMilestones([]);
    router.reload();
  };

  // Function to handle deletion of a milestone
  const deleteHandler = (index: number) => {
    const inputData = [...newMilestones];
    inputData.splice(index, 1);
    setNewMilestones(inputData);
  };
  return (
    <div className='p-5 flex flex-col gap-2'>
      {milestones.length > 0 && (
        <div
          className={`grid ${
            role === 'freelancer' ? 'grid-cols-4' : 'grid-cols-3'
          } items-center justify-between text-center bg-gray-800 dark:bg-gray-700 font-semibold text-white p-2 capitalize rounded-md shadow`}
        >
          <span>Title</span>
          <span>Status</span>
          <span>Last Update</span>
          {role === 'freelancer' && <span>Update Status</span>}
        </div>
      )}
      {milestones.length > 0 &&
        milestones.map((milestone) => {
          return (
            <Milestone key={milestone._id} milestone={milestone} role={role} />
          );
        })}
      {role === 'freelancer' && (
        <div className='flex flex-col gap-4 mt-10'>
          {showForm &&
            newMilestones.map((milestone, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <div className='grid grid-cols-[5fr_1fr] items-center gap-2'>
                  <Input
                    name='title'
                    onChange={(e) => changeHandler(e, index)}
                    placeholder="Enter Milestone's title"
                  />
                  <Button
                    className=' focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5'
                    onClick={() => deleteHandler(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          {!isComplete && (
            <div className='flex gap-5 justify-between items-center mt-5'>
              <Button onClick={addMilestone}>Add New Milestone</Button>
              {newMilestones.length > 0 && (
                <Button
                  onClick={handleSave}
                  className=' w-full relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group'
                >
                  <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease'>
                    <TiTick size={30} />
                  </span>
                  <span className='absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease'>
                    Save New Milestones
                  </span>
                  <span className='relative invisible'>
                    Save New Milestones
                  </span>
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MilestoneList;
