import React, { FC, MouseEvent } from 'react';
import { MdOutlineDescription } from 'react-icons/md';

import Container from '../../../UI/Container';
import Modal from '../../../UI/Modal';
interface IProps {
  workHistory: IProject;
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}
const WorkHistoryDetails: FC<IProps> = ({ workHistory, onClose }) => {

  return (
    <Modal className='p-2 flex flex-col' onClose={onClose} Side>
      <Container className='flex flex-col min-h-[85vh] justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <h1 className='font-bold text-3xl capitalize'>
              {workHistory?.job.title}
            </h1>
          </div>
          <h4 className='text-md px-1 mt-1 font-semibold text-blue-500'>
            {workHistory?.job.category.name}
          </h4>

          <div className='flex flex-col gap-2'>
            <h3 className='font-medium text-2xl flex gap-1  items-center'>
              <MdOutlineDescription />
              Description:
            </h3>
            <p className='text-sm whitespace-pre-wrap ml-10'>
              {workHistory?.job.description}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='inline-flex items-center justify-center w-full'>
              <hr className='w-[90%] h-1 my-4 border-0 rounded bg-gray-800' />
              <div className='absolute px-4 mb-1 -translate-x-1/2 bg-white dark:bg-gray-700 left-1/2 font-semibold text-lg'>
                Requirements
              </div>
            </div>
            <div className='grid grid-cols-2 items-center text-center  font-semibold text-sm'>
              <div className='flex flex-col gap-1'>
                <span>Fixed-price</span>
                <span className='text-sm font-light text-black capitalize dark:text-blue-500'>
                  ${workHistory?.job.budget.toFixed(2)}
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span>Experience</span>
                <span className='text-sm font-light text-black capitalize dark:text-blue-500'>
                  {workHistory?.job.experience_level} Level
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='inline-flex items-center justify-center w-full'>
              <hr className='w-[90%] h-1 my-4 border-0 rounded bg-gray-800' />
              <div className='absolute px-4 mb-1 -translate-x-1/2 bg-white dark:bg-gray-700 left-1/2 font-semibold text-lg'>
                Skills &amp; Expertise
              </div>
            </div>
            <div className='mt-2'>
              <div className='flex mt-2 gap-3 flex-wrap items-center justify-center'>
                {workHistory?.job.skills?.map((skill: ISkill) => (
                  <span
                    key={skill._id}
                    title={skill.name}
                    className='px-4 py-2 flex text-center  shadow text-xs rounded-md text-white font-semibold bg-blue-500 '
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
  
      </Container>
    </Modal>
  );
};

export default WorkHistoryDetails;
