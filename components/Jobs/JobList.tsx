import { FC, MouseEvent, useState } from 'react';

import Job from './Job';
import ModalManager from '../Forms/Modal Forms/ModalManager';
import Container from '../UI/Container';

interface IProps {
  jobs: IUser['jobs'];
  user: IUser;
  isSameRole: boolean;
  isFreelancer: 'freelancer' | 'client';
  isOwnProfile: boolean;
}

const JobList: FC<IProps> = ({
  jobs,
  user,
  isFreelancer,
  isOwnProfile,
  isSameRole,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();
  const [modalType, setModalType] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    const type = event.currentTarget.getAttribute('data-modal-type');
    setModalType(type ? type : undefined);
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setSelectedJobId(undefined);
    setShowModal(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
  };
  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className='flex flex-wrap'>
      <form className='relative w-full my-2'>
        <input
          type='search'
          placeholder='Find jobs by title'
          onChange={handleSearchChange}
          className='peer cursor-pointer relative z-[2] h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-blue-300 focus:pl-16 focus:pr-4'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-blue-300 peer-focus:stroke-blue-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </form>
      {filteredJobs && filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <Job
            key={job._id}
            job={job}
            onClick={handleJobClick}
            ModalHandler={showModalHandler}
          />
        ))
      ) : (
        <div className='h-40 flex items-center mx-auto text-base'>
          <p>No results found for '{searchTerm}'</p>
        </div>
      )}
      {selectedJobId && (
        <ModalManager
          Type={modalType}
          user={user}
          jobId={selectedJobId}
          onClose={hideModalHandler}
          isSameRole={isSameRole}
          isOwnProfile={isOwnProfile}
          isFreelancer={isFreelancer}
        />
      )}
    </Container>
  );
};

export default JobList;
