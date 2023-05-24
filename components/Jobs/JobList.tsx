import Image from 'next/image';
import { FC, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import Job from './Job';
import Container from '../UI/Container';

interface IProps {
  jobs: IUser['jobs'];
  isSameRole?: boolean;
  isFreelancer?: 'freelancer' | 'client' | null;
  isOwnProfile?: boolean;
}

const JobList: FC<IProps> = ({
  jobs,
  isFreelancer,
  isOwnProfile,
  isSameRole,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderCondition = jobs && filteredJobs && filteredJobs.length > 0;
  return (
    <Container className='flex flex-wrap flex-col'>
      <form className='relative w-full my-2 h-[3rem] mb-5'>
        <div className='relative'>
          <AiOutlineSearch
            size={20}
            className='absolute z-[5] cursor-pointer top-[14px] left-4 text-black dark:text-white'
          />
          <input
            className='relative text-sm leading-none text-gray-600 bg-gray-100   rounded  w-full px-10 py-4 outline-none dark:bg-gray-900 dark:outline-gray-700 dark:text-white'
            type='text'
            placeholder='Find jobs by title'
            onChange={handleSearchChange}
          />
        </div>
      </form>

      {renderCondition ? (
        filteredJobs.map((job) => (
          <Job
            key={job._id}
            job={job}
            isSameRole={isSameRole}
            isOwnProfile={isOwnProfile}
            isFreelancer={isFreelancer}
          />
        ))
      ) : (
        <div className=' flex flex-col p-5 items-center mx-auto text-base'>
          <p className=' text-2xl'>
            Oops, it seems there are no jobs that match your criteria!
          </p>
          <Image
            src='/images/404.svg'
            height={400}
            width={400}
            alt='not found'
          />
        </div>
      )}
    </Container>
  );
};

export default JobList;
