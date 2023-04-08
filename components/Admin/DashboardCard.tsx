import React from 'react';

interface IProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  bgColor: string;
}

const DashboardCard: React.FC<IProps> = ({ title, content, icon, bgColor }) => {
  return (
    <div className={`overflow-hidden rounded-md shadow-md   ${bgColor}`}>
      <div className='px-4 py-5 sm:p-6'>
        <div>
          <div className='font-bold flex gap-2 items-center leading-5 text-white truncate'>
            {icon}
            <span>{title}</span>
          </div>
          <div className='mt-1 text-3xl font-semibold leading-9 text-white'>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
