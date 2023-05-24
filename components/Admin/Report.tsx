import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
interface IProps {
  report: IReports;
}
const Report: React.FC<IProps> = ({ report }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false); // Update state to a single boolean value
  const handleCheckboxChange = () => {
    // Remove index parameter
    setIsChecked(!isChecked); // Toggle boolean value directly
  };
  return (
    <div className='w-full rounded-b-sm '>
      <input
        type='checkbox'
        name={`panel-${report._id}`}
        id={`panel-${report._id}`}
        className='hidden'
        onChange={handleCheckboxChange}
      />
      <div className='relative grid grid-cols-[11fr_0.2fr] gap-2 items-center text-lg  shadow border-b rounded-b-sm dark:border-gray-600 bg-blue-500 dark:bg-gray-700'>
        <label
          htmlFor={`panel-${report._id}`}
          className='cursor-pointer bg-transparent p-4 flex items-center gap-2 text-white z-10'
        >
          <Link
            href={`/${report.reported_user.role}/~${report.reported_user._id}`}
            className='hover:text-gray-200'
          >
            {report.userId.first_name} {report.userId.last_name}
          </Link>
        </label>
      </div>

      <AnimatePresence initial={false}>
        {isChecked && (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0 }}
            className={`overflow-hidden bg-gray-100 p-4   flex flex-col gap-2 dark:text-black `}
          >
            <p>
              <span className='font-bold'>Sender's Name: </span>
              {report.userId.first_name} {report.userId.last_name}
            </p>
            <p
              className='whitespace-pre-wrap capitalize text-sm'
              id={`panel-${report._id}`}
            >
              {report.feedback}
            </p>
            <time className=' flex gap-1 items-center'>
              <span className='font-bold'>Received:</span>
              {new Date(report.createdAt).toLocaleString('en-GB', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </time>

            <div className='flex items-center justify-end'>
              <Link
                href={`/${report.reported_user.role}/~${report.reported_user._id}`}
                className='rounded relative w-[150px] inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'
              >
                <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-24 opacity-10'></span>
                <span className='relative text-xs'>View Reported User</span>
              </Link>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Report;
