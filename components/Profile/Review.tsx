import React from 'react';

interface IProps {
  name: string;
  feedback: string;
  value: number;
  date: string;
}

const Review: React.FC<IProps> = ({ name, feedback, value, date }) => {
  const stars = [];
  const currDate = new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        aria-hidden='true'
        className={`w-5 h-5 ${i < value ? 'text-yellow-400' : 'text-gray-400'}`}
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
    <article className='p-5 border shadow-md rounded-lg grid grid-cols-1 gap-2 dark:shadow-gray-900 cursor-pointer dark:bg-gray-700 dark:border-gray-600'>
      <div className='flex justify-center mb-2 flex-col'>
        <div className='font-medium '>
          <p>
            {name}
            <time
              dateTime={date}
              className='block text-xs text-gray-500 dark:text-gray-400'
            >
              {currDate}
            </time>
          </p>
        </div>
        <div className='flex'>{stars}</div>
      </div>

      <p className='text-sm'>{feedback}</p>
    </article>
  );
};
export default Review;
