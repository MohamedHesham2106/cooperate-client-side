import Image from 'next/image';
import React from 'react';
interface IProps {
  review: IReviews;
}
const Review: React.FC<IProps> = ({ review }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        aria-hidden='true'
        className={`w-5 h-5 ${
          i < review.value ? 'text-yellow-400' : 'text-gray-400'
        }`}
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>Star {i + 1}</title>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
      </svg>
    );
  }
  return (
    <div className='bg-white p-6 shadow rounded-sm dark:bg-gray-700'>
      <div className='flex items-center border-b border-gray-200'>
        {review.user.imageUrl && (
          <div className='relative w-12 h-12'>
            <Image
              src={review.user.imageUrl}
              fill
              alt={`${review.user.first_name}`}
              className=' rounded-full'
            />
          </div>
        )}
        <div className='flex items-start justify-between w-full '>
          <div className='w-full flex flex-col gap-2'>
            <p className='text-lg font-bold leading-5 text-gray-800 dark:text-white'>
              {review.user.first_name} {review.user.last_name}
            </p>
            <div className='flex items-center pb-2'>{stars}</div>
          </div>
        </div>
      </div>
      <div className='px-2'>
        <p className='text-sm leading-5 py-4 text-gray-600 dark:text-white'>
          {review.feedback}
        </p>
        <div className='flex justify-end'>
          <div
            className={`py-2 px-4 text-xs leading-3 text-white rounded-full ${
              review.status === 'Positive Review'
                ? 'bg-green-400'
                : 'bg-red-400'
            }`}
          >
            {review.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
