import { useRouter } from 'next/router';
import {
  FC,
  Fragment,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { HiOutlineX } from 'react-icons/hi';
import { MdOutlineDescription } from 'react-icons/md';

import Button from '../UI/Button';
import Container from '../UI/Container';
import Modal from '../UI/Modal';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  jobId?: string;
  isSameRole?: boolean;
  isFreelancer?: 'freelancer' | 'client';
  isOwnProfile?: boolean;
}
const JobDetails: FC<IProps> = ({
  jobId,
  onClose,
  isFreelancer,
  isOwnProfile,
  isSameRole,
}) => {
  const [data, setData] = useState<{ job: IJobs }>();
  const { refreshToken } = useContext(AuthContext);
  const getJob = useCallback(async () => {
    await axiosInstance
      .get(`/api/job/${jobId}`)
      .then((response) => setData(response.data));
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      getJob();
    }
  }, [getJob, jobId]);
  const removeJobHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await axiosInstance
      .delete(`/api/job/${getPayloadFromToken(refreshToken).sub}`, {
        data: {
          jobId,
        },
      })

      .then((_res) =>
        toast.success('Job Deleted.', {
          style: {
            border: '1px solid #07bd3a',
            padding: '16px',
          },
        })
      )
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        toast.error(message, {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      })
      .finally(() => {
        router.reload();
      });
  };
  const router = useRouter();
  return (
    <Fragment>
      {data && (
        <Modal
          className='p-2 flex flex-col gap-5'
          onClose={onClose}
          tall={true}
        >
          <Container className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <h1 className='font-normal text-3xl'>{data?.job.title}</h1>
              <button
                onClick={onClose}
                type='button'
                className='bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset'
              >
                <HiOutlineX size={25} />
              </button>
            </div>

            <h4 className='text-md px-1 mt-1 font-semibold text-blue-500'>
              {data?.job.category.name}
            </h4>
          </Container>
          <Container className='px-0.5 grid grid-cols-1 gap-2'>
            <h3 className='font-medium text-2xl flex gap-1 mb-2 items-center'>
              <MdOutlineDescription />
              Description:
            </h3>
            <p className='text-sm whitespace-pre-wrap'>
              {data?.job.description}
            </p>
            <div className='inline-flex items-center justify-center w-full'>
              <hr className='w-[90%] h-1 my-4 border-0 rounded bg-gray-700' />
              <div className='absolute px-4 mb-1 -translate-x-1/2 bg-white left-1/2 font-semibold text-lg'>
                Requirements
              </div>
            </div>
            <div className='grid grid-cols-2 items-center text-center mt-4 font-semibold text-sm'>
              <div className='flex flex-col gap-1'>
                <span>${data?.job.budget.toFixed(2)}</span>
                <span className='text-xs font-light text-black'>
                  Fixed-price
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span>Experience</span>
                <span className='text-xs font-light text-black capitalize'>
                  {data?.job.experience_level} Level
                </span>
              </div>
            </div>
            <div className='inline-flex items-center justify-center w-full'>
              <hr className='w-[90%] h-1 my-4 border-0 rounded bg-gray-700' />
              <div className='absolute px-4 mb-1 -translate-x-1/2 bg-white left-1/2 font-semibold text-lg'>
                Skills &amp; Expertise
              </div>
            </div>
            <div className='mt-2'>
              <div className='flex mt-2 gap-2 flex-wrap items-center justify-center'>
                {data?.job.skills?.map((skill: ISkill) => (
                  <span
                    key={skill._id}
                    title={skill.name}
                    className='px-4 py-2  text-sm rounded-3xl text-blue-600 font-medium bg-blue-200 '
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </Container>
          {!isOwnProfile && isFreelancer === 'freelancer' && !isSameRole && (
            <Container className='flex justify-end mt-2'>
              <Button
                width='w-1/3'
                onClick={() => router.push(`/proposals/job/~${jobId}`)}
              >
                Send Proposal
              </Button>
            </Container>
          )}
          {isOwnProfile && (
            <Container className='flex mt-2'>
              <Button
                className='focus:outline-none w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={removeJobHandler}
              >
                Delete this Job
              </Button>
            </Container>
          )}
        </Modal>
      )}
    </Fragment>
  );
};

export default JobDetails;
