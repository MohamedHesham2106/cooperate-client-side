import Image from 'next/image';
import React from 'react';

interface IProps {
  review: IReviews;
}

const Review: React.FC<IProps> = ({ review }) => {
  const stars = [];

  // Get the formatted creation date of the review
  const currDate = new Date(review.createdAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Generate star icons based on the review value
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
    <article className='border shadow-md rounded-md grid grid-cols-1 gap-2 dark:shadow-gray-900 cursor-pointer dark:bg-gray-700 dark:border-gray-600'>
      <div className='flex justify-center flex-col  bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm  '>
        <div className='flex items-center gap-2 px-5 py-3'>
          <div className='w-10 h-10 relative '>
            <Image
              src={
                review.user.imageUrl
                  ? review.user.imageUrl
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              alt={
                review.user._id
                  ? review.user._id
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              fill
              className=' object-cover rounded-md'
            />
          </div>

          <div className='font-medium '>
            <p>
              {review.user.first_name} {review.user.last_name}
              <time
                dateTime={review.createdAt}
                className='block text-xs text-gray-500 dark:text-gray-400'
              >
                {currDate}
              </time>
            </p>
          </div>
        </div>
      </div>
      <div className='p-5 flex flex-col gap-2 '>
        <div className='flex'>{stars}</div>
        <p className='text-sm'>{review.feedback}</p>
      </div>
    </article>
  );
};
export default Review;
