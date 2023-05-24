import React, { useState } from 'react';

import Freelancer from './Freelancer';

interface IProps {
  freelancers: IUser[];
}

const FreelancerList: React.FC<IProps> = ({ freelancers }) => {
  const [visibleFreelancers, setVisibleFreelancers] = useState(10);

  const showMoreFreelancers = () => {
    setVisibleFreelancers(
      (prevVisibleFreelancers) => prevVisibleFreelancers + 10
    );
  };

  const shouldShowMoreButton = visibleFreelancers < freelancers.length;

  return (
    <div className='grid grid-cols-1 gap-2 w-full'>
      {freelancers.slice(0, visibleFreelancers).map((freelancer) => (
        <Freelancer freelancer={freelancer} key={freelancer._id} />
      ))}
      {shouldShowMoreButton && (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={showMoreFreelancers}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default FreelancerList;
