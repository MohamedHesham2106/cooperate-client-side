import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../components/UI/Button';
import { useAuthenticate } from '../../context/AuthProvider';
import axiosInstance from '../../utils/axios';
const AdminContact: NextPage = () => {
  const { uuid } = useAuthenticate();
  const [message, setMessage] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedOption(value);
  };

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  };
  const onSubmitMessage = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (message.trim().length === 0 || selectedOption === '') {
      toast.error('You Must Write a Reason.');
      return;
    }
    try {
      await axiosInstance.post(`/api/message/${uuid}`, {
        message,
        subject: selectedOption,
      });
      toast.success('Message submitted. Our team will contact you soon.');

      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      //   console.log(error);
    }
  };
  const MAX_CHARACTERS = 400;
  const descriptionLength = message?.length;
  const charactersLeft = MAX_CHARACTERS - Number(descriptionLength);
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className='md:w-9/12 w-11/12 mx-auto my-24 border flex flex-col border-gray-300 rounded-md shadow-lg p-5 gap-4 dark:bg-gray-700 dark:border-gray-800'
    >
      <h1 className='font-bold text-center text-4xl'>Contact Admin</h1>
      <div className='flex flex-col gap-5'>
        <div className='relative inline-flex'>
          <svg
            className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 412 232'
          >
            <path
              d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
              fill='#648299'
              fill-rule='nonzero'
            />
          </svg>
          <select
            className='w-full border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none dark:bg-gray-900 dark:text-white'
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option disabled value=''>
              Choose a subject
            </option>
            <option value='general-inquiry'>General Inquiry</option>
            <option value='account-support'>Account Support</option>
            <option value='technical-issue'>Technical Issue</option>
            <option value='bug-report'>Bug Report</option>
            <option value='feature-request'>Feature Request</option>
            <option value='content-request'>Content Request</option>
            <option value='partnership-opportunities'>
              Partnership Opportunities
            </option>
            <option value='advertising-inquiry'>Advertising Inquiry</option>
            <option value='dmca-copyright-issue'>DMCA/Copyright Issue</option>
            <option value='privacy-concerns'>Privacy Concerns</option>
            <option value='feedback-suggestions'>Feedback/Suggestions</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className='flex flex-col relative'>
          <textarea
            name='message'
            rows={8}
            value={message}
            onChange={handleChange}
            className='block p-5 w-full text-sm text-gray-800 bg-white border border-gray-400 outline-none focus:border-blue-500 resize-none dark:bg-gray-900 dark:focus:border-gray-500 dark:text-white'
            placeholder='Describe the issue'
            required
            maxLength={MAX_CHARACTERS}
          ></textarea>
          <span className='absolute bottom-2 right-2 text-gray-400'>
            {charactersLeft} characters left
          </span>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          onClick={onSubmitMessage}
          type='button'
          className='rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'
        >
          <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-12 opacity-10'></span>
          <span className='relative'>Send</span>
        </Button>
      </div>
    </motion.section>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;
  try {
    if (jwt_refresh) {
      return {
        props: {},
      };
    }
    return { redirect: { destination: '/login', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default AdminContact;
