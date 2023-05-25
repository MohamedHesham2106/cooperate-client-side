import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
interface IProps {
  personal_projects: IUser['personal_projects'];
}
const PersonalProjectsSection: React.FC<IProps> = ({ personal_projects }) => {
  return (
    <div className='flex justify-center flex-col mt-3 gap-3 cursor-pointer'>
      {personal_projects && personal_projects.length > 0 ? (
        personal_projects?.map(({ title, url }, i) => (
          <div key={i} className='flex flex-col gap-1'>
            <span title={title} className='mb-2 text-base font-semibold '>
              {title}
            </span>
            <a
              title={title}
              target='_blank'
              rel='noreferrer'
              href={url}
              className='px-4 py-2 flex gap-2 items-center text-sm border-2 sm:w-fit rounded-md text-gray-600 font-bold bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700 shadow-md dark:shadow-gray-900 '
            >
              <span>{title}</span>
              <span>
                <BiLinkExternal size={20} />
              </span>
            </a>
          </div>
        ))
      ) : (
        <div className='flex justify-center flex-col mt-3'>
          No Personal Projects added yet.
        </div>
      )}
    </div>
  );
};

export default PersonalProjectsSection;
