import React, { Fragment } from 'react';

const Search = () => {
  return (
    <Fragment>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <input
        type='text'
        className=' py-2 pl-12 pr-4 rounded-full  flex-1 appearance-none border border-gray-300 w-full px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        placeholder='Search'
      />
    </Fragment>
  );
};

export default Search;
