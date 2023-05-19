import React, { useState } from 'react';
import useSWR from 'swr';

import Review from './Review';
import { fetcher } from '../../../utils/axios';

const ReviewsList: React.FC = () => {
  const { data } = useSWR('/api/machine/sentiment', fetcher, {
    refreshInterval: 30 * 1000 * 60,
  });

  const reviews = data?.reviews;
  const [filter, setFilter] = useState<'positive' | 'negative' | 'all'>('all');

  // Filter the reviews based on the selected filter
  const filteredReviews = reviews?.filter((review: IReviews) => {
    if (filter === 'positive') {
      return review.status === 'Positive Review';
    } else if (filter === 'negative') {
      return review.status === 'Negative Review';
    }
    return true; // Show all reviews if no specific filter is selected
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value as 'positive' | 'negative' | 'all');
  };

  return (
    <section className='flex flex-col gap-1 w-full'>
      <div className='flex gap-2 p-5 bg-gray-50 rounded-md text-sm items-center dark:bg-gray-700'>
        <label className='flex items-center gap-1'>
          <input
            type='radio'
            value='positive'
            checked={filter === 'positive'}
            onChange={handleFilterChange}
          />
          Show Positive Reviews
        </label>
        <label className='flex items-center gap-1'>
          <input
            type='radio'
            value='negative'
            checked={filter === 'negative'}
            onChange={handleFilterChange}
          />
          Show Negative Reviews
        </label>
        <label className='flex items-center gap-1'>
          <input
            type='radio'
            value='all'
            checked={filter === 'all'}
            onChange={handleFilterChange}
          />
          Show All Reviews
        </label>
      </div>

      {filteredReviews?.map((review: IReviews) =>
        review.feedback ? <Review review={review} key={review._id} /> : null
      )}
    </section>
  );
};

export default ReviewsList;
