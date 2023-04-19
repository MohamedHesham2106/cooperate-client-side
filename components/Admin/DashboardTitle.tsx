import React from 'react';

interface IProps {
  title: string;
  url: string;
  pageName: string;
}
const DashboardTitle: React.FC<IProps> = ({ url, pageName, title }) => {
  return (
    <div className='flex flex-col gap-5 py-2'>
      <h1
        className='text-4xl font-bold 
  '
      >
        {title}
      </h1>
      <h6
        className='text-xl font-semibold bg-gray-100 shadow flex gap-2 items-center p-2 dark:bg-gray-700 dark:text-white
  '
      >
        {url} <span className='text-gray-400'>/ {pageName}</span>
      </h6>
    </div>
  );
};

export default DashboardTitle;
