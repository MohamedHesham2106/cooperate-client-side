import React from 'react';
import useSWR from 'swr';

import Review from './Review';
import { fetcher } from '../../../utils/axios';

const ReviewsList: React.FC = () => {
  const { data } = useSWR('/api/machine/sentiment', fetcher, {
    refreshInterval: 30 * 1000 * 60,
  });
  const reviews = data?.ratings;

  return (
    <section className='flex flex-col gap-1 w-full'>
      {reviews?.map((review: IReviews) =>
        review.feedback ? <Review review={review} key={review._id} /> : null
      )}
    </section>
  );
};

export default ReviewsList;
