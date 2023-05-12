import { Fragment } from 'react';

import { ChoosingGoal, Discussing, ReachingGoal } from '../SVG/ClientGuideSVG';
import { clientGuide } from '../../utils/guide';

const ClientGuide: React.FC = () => {
  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Fragment>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>Table of Contents:</h2>
        <ul className='flex flex-col gap-1 px-10 py-5 bg-gray-100 dark:bg-gray-700 rounded-md w-fit'>
          {clientGuide.map((guide, index) => (
            <li className='list-decimal' key={index}>
              <a
                className='text-sm cursor-pointer text-blue-500 hover:text-blue-600'
                onClick={(event) =>
                  scrollToSection(event, `section-${index + 1}`)
                }
              >
                {guide.headline}
              </a>
            </li>
          ))}
        </ul>
        {clientGuide.map((guide, index) => (
          <div key={index} id={`section-${index + 1}`} className='p-5'>
            <h2 className='font-bold text-3xl leading-10'>{guide.headline}</h2>
            <ul>
              {guide.content.map((content, index) => (
                <li
                  key={index}
                  className='list-disc tracking-wide mx-10 leading-10'
                >
                  {content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='hidden lg:flex flex-col w-full gap-5'>
        <ChoosingGoal />
        <Discussing />
        <ReachingGoal />
      </div>
    </Fragment>
  );
};

export default ClientGuide;
