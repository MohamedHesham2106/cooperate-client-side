import { FC, MouseEvent } from 'react';
import { FcViewDetails } from 'react-icons/fc';
import { MdOutlineDescription } from 'react-icons/md';
import useSWR from 'swr';

import Container from '../UI/Container';
import Modal from '../UI/Modal';
import axiosInstance from '../../utils/axios';
import Button from '../UI/Button';
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
  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
  const { data } = useSWR(`/api/job/${jobId}`, fetcher);

  return (
    <Modal className='p-2 flex flex-col gap-5' onClose={onClose} tall={true}>
      <Container className='flex flex-col'>
        <h1 className='font-normal text-3xl'>{data?.job.title}</h1>
        <h4 className='text-sm px-1 mt-4 font-semibold text-blue-500'>
          {data?.job.category.name}
        </h4>
      </Container>
      <Container className='px-0.5 grid grid-cols-1 gap-2'>
        <h3 className='font-medium text-xl flex gap-1 items-center'>
          <MdOutlineDescription />
          Description:
        </h3>
        <p className='text-sm'>{data?.job.description}</p>
        <div className='inline-flex items-center justify-center w-full'>
          <hr className='w-[90%] h-1 my-4 border-0 rounded bg-gray-700' />
          <div className='absolute px-4 mb-1 -translate-x-1/2 bg-white left-1/2 font-semibold text-lg'>
            Requirements
          </div>
        </div>
        <div className='grid grid-cols-2 items-center text-center mt-4 font-semibold text-sm'>
          <div className='flex flex-col gap-1'>
            <span>${data?.job.budget.toFixed(2)}</span>
            <span className='text-xs font-light text-black'>Fixed-price</span>
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
                className='px-4 py-2  text-sm rounded-3xl text-blue-600 font-semibold bg-blue-200 '
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
      {!isOwnProfile && isFreelancer === 'freelancer' && !isSameRole && (
        <Container className='flex justify-end mt-5'>
          <Button width='w-1/3'>Send Proposal</Button>
        </Container>
      )}
    </Modal>
  );
};

export default JobDetails;
