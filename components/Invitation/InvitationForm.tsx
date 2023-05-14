import Link from 'next/link';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../UI/Button';
import CustomSelect from '../UI/CustomSelect';
import Form from '../UI/Form';
import { useNotification } from '../../context/NotificationProvider';
import axiosInstance from '../../utils/axios';

interface IProps {
  user: Partial<IUser>;
  freelancer: Partial<IUser>;
}
interface IOption {
  id: string;
  name: string;
}

const InvitationForm: FC<IProps> = ({ user, freelancer }) => {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [invitationLetter, setInvitationLetter] = useState<string>('');
  const { sendNotification } = useNotification();
  const MAX_CHARACTERS = 1000;
  // calculate number of characters left
  const invitationLetterLength = invitationLetter?.length;
  const charactersLeft = MAX_CHARACTERS - Number(invitationLetterLength);

  const selectJobHandler = (selected: string) => {
    const selectedJobId = user.jobs?.find((job) => job.title === selected)?._id;
    setSelectedJob(selectedJobId ?? '');
  };
  const handleChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setInvitationLetter(value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invitationLetter?.length === 0) {
      toast.error('Please Fill The Invitation Message.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    } else if (selectedJob === '') {
      toast.error('Please Choose a Job.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    } else {
      await axiosInstance
        .post(`/api/invitation/${user._id}`, {
          job_id: selectedJob,
          invitation_letter: invitationLetter,
          freelancer_id: freelancer._id,
        })
        .then(() => {
          sendNotification(
            user._id,
            freelancer._id,
            `${user.first_name} ${
              user.last_name
            } sees you as potential candidate For ${
              user.jobs?.find((job) => selectedJob === job._id)?.title
            }`,
            `/invitation/received/~${freelancer._id}`
          );
          toast.success('Invitation Sent!', {
            style: {
              border: '1px solid #07bd3a',
              padding: '16px',
            },
          });
        })
        .catch((error) => {
          const err = error as IError;
          const { message } = err.response.data;
          toast.error(message, {
            style: {
              border: '1px solid #ce1500',
              padding: '16px',
            },
          });
        });
    }
  };

  const jobList: IOption[] | undefined = user.jobs?.map((job) => ({
    id: job._id,
    name: job.title,
  }));
  return (
    <div className='p-5 flex flex-col gap-5 dark:bg-gray-700 '>
      <h2 className='text-2xl font-medium text-center p-5 text-white rounded-lg shadow-md mb-5 bg-blue-500 dark:bg-gray-800'>
        Gig Invitation to{' '}
        <Link href={`/freelancer/~${freelancer._id}`}>
          {freelancer.first_name} {freelancer.last_name}
        </Link>
      </h2>
      <Form OnSubmit={handleSubmit} className='flex flex-col gap-2'>
        <h3 className='text-left text-lg font-medium'>Choose the Job:</h3>
        <CustomSelect
          options={jobList}
          label='Job you want freelancer to apply for'
          onSelect={selectJobHandler}
        />
        <section className='flex flex-col gap-4 relative'>
          <h3 className='text-left text-lg font-medium'>Invitation Message:</h3>
          <textarea
            name='invitation_letter'
            onChange={handleChange}
            rows={8}
            className='block p-5 w-full text-sm text-gray-800 bg-white border-2  rounded-md border-gray-300 outline-none focus:border-blue-400 resize-none dark:bg-gray-900 dark:border-gray-900 dark:text-white'
            value={invitationLetter}
            maxLength={MAX_CHARACTERS}
          ></textarea>
          <span className='absolute bottom-3 right-3 text-gray-400'>
            {charactersLeft} characters left
          </span>
        </section>
        <div className='flex items-center justify-end mt-4'>
          <Button type='submit' width='sm:w-2/5 w-full'>
            Send Invitation
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InvitationForm;
