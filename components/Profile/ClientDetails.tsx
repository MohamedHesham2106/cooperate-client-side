import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { MdEdit } from 'react-icons/md';
import useSWR from 'swr';

import Review from './Review';
import JobList from '../Jobs/JobList';
import Button from '../UI/Button';
import { fetcher } from '../../utils/axios';


interface IProps {
  isOwnProfile: boolean;
  user: IUser;
  isSameRole: boolean;
  isFreelancer: 'freelancer' | 'client';
  ModalHandler?: (event: MouseEvent<SVGAElement | HTMLDivElement>) => void;
}
const ClientDetails: FC<IProps> = ({
  isFreelancer,
  isSameRole,
  isOwnProfile,
  user,
  ModalHandler,
}) => {
  const { language, education, jobs, _id } = user;
  const { data: reviews } = useSWR(`/api/rating/${_id}`, fetcher);
  // console.log(reviews);
  const router = useRouter();
  const renderLanguages = () => (
    <div className='flex justify-center flex-col w-1/2 mt-3'>
      {language?.map(({ language, level }, i) => (
        <div key={i} className='grid grid-cols-[1fr_2fr] items-center'>
          <span className='font-semibold'>{language}:</span>
          <span className='capitalize font-[350] text-gray-600 text-sm '>
            {level}
          </span>
        </div>
      ))}
    </div>
  );
  const renderEducation = () => (
    <div className='flex justify-center flex-col mt-3'>{education}</div>
  );

  return (
    <div className=' bg-white flex flex-col md:flex-row justify-between rounded-b-md px-3 my-8 border-t-2'>
      <div className=' md:w-2/6 py-6 px-3  md:border-r-2 md:border-gray-200 flex flex-wrap flex-col gap-5'>
        <div className='flex flex-col justify-between mt-3'>
          <div className='flex items-center gap-2 flex-wrap'>
            <GrLanguage size={18} />
            <span className='font-semibold text-xl pb-1'>Languages</span>
            {isOwnProfile && (
              <div
                className='cursor-pointer border-2 rounded-full p-[0.3rem] border-blue-500'
                onClick={ModalHandler}
                data-modal-type='language'
              >
                <MdEdit size={12} />
              </div>
            )}
          </div>
          {renderLanguages()}
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2 flex-wrap'>
            <FaGraduationCap size={18} />
            <span className='font-semibold text-xl pb-1'>Education</span>
          </div>
          {renderEducation()}
        </div>
      </div>
      <div className='md:w-4/6 py-6 px-3 flex flex-col'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl'>
            {isOwnProfile ? 'Your Postings' : 'Jobs Posted'}
          </h1>
          <span className='w-1/2 border-b-2 my-2 border-black'></span>
          {!jobs || jobs.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-3 my-5'>
              <Image
                src='/images/empty-jobs.svg'
                alt='empty folder'
                width={250}
                height={250}
              />
              <h1 className='font-semibold'>No active jobs posts</h1>
              {isOwnProfile && (
                <h1 className='text-gray-400'>
                  Post a job to the marketplace and let talent come to you.
                </h1>
              )}

              {isOwnProfile && (
                <Button
                  width='w-45'
                  onClick={() => {
                    router.push(`/${user.role}/~${user._id}/job-post`);
                  }}
                >
                  Post a Job
                </Button>
              )}
            </div>
          ) : (
            <JobList
              jobs={jobs}
              isSameRole={isSameRole}
              isOwnProfile={isOwnProfile}
              isFreelancer={isFreelancer}
            />
          )}
        </div>
        <div className='flex flex-col border-t-2 border-gray-200 pt-5 gap-5'>
          <h1 className='font-semibold text-2xl'>Reviews</h1>
          {reviews && (
            <div className='flex flex-col gap-3 max-h-52 overflow-y-auto scrollbar-hide'>
              {reviews.map((review: IReviews) => (
                <Review
                  key={review._id}
                  name={`${review.rated_user.first_name} ${review.rated_user.last_name}`}
                  feedback={review.feedback}
                  value={review.value}
                  date={review.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
