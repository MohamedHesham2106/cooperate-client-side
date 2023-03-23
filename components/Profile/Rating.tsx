import { FC, useState } from 'react';
interface IProps {
  onRate: (rating: number) => void;
}

const Rating: FC<IProps> = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className='flex flex-col gap-1 items-center'>
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          const fillColor =
            starValue <= rating ? 'text-yellow-400' : 'text-gray-400';
          return (
            <svg
              key={index}
              aria-hidden='true'
              className={`w-16 h-16 cursor-pointer  ${fillColor}`}
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => handleRatingClick(starValue)}
            >
              <title>{`${starValue} ${
                starValue === 1 ? 'star' : 'stars'
              }`}</title>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
