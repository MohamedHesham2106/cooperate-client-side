import React from 'react';
interface IProps {
  categories: IUser['categories'];
}
const WorkCategorySection: React.FC<IProps> = ({ categories }) => {
  return (
    <div className='grid grid-cols-1 gap-3 cursor-pointer w-full md:w-3/5 mt-3 md:mt-0'>
      {categories?.map(({ _id, name }) => (
        <span
          key={_id}
          title={name}
          className='px-4 py-2 text-xs rounded-md text-blue-600 dark:border-2 font-bold bg-blue-100 text-center dark:bg-gray-900 dark:text-white dark:border-gray-700 shadow-md dark:shadow-gray-900'
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default WorkCategorySection;
