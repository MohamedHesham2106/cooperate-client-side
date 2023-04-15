import React from 'react';
interface IProps {
  categories: IUser['categories'];
}
const WorkCategorySection: React.FC<IProps> = ({ categories }) => {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 mt-3 gap-3 cursor-pointer'>
      {categories?.map(({ _id, name }) => (
        <span
          key={_id}
          title={name}
          className='px-4 py-2 text-sm rounded-md text-blue-600 ring-2 ring-blue-500 ring-offset-2 font-semibold bg-blue-100 text-center'
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default WorkCategorySection;
