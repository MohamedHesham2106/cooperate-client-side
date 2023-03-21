import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import Button from '../UI/Button';
import Container from '../UI/Container';
type Props = {
  roleFetch: (arg: string) => void;
};
const UserType = ({ roleFetch }: Props) => {
  const [role, setRole] = useState('');

  const typeHandler = (event: MouseEvent<HTMLElement>) => {
    const target = event?.target as HTMLInputElement;

    setRole(target.value);
  };

  const submitHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    roleFetch(role);
  };

  let buttonStatement;
  if (!role) {
    buttonStatement = 'Create Account';
  } else if (role === 'client') {
    buttonStatement = 'Join as a Client';
  } else {
    buttonStatement = 'Apply as a Freelancer';
  }
  return (
    <Container className='max-w-xl mx-auto py-12 my-28 flex items-center justify-between flex-col border-2 shadow-sm rounded-md font-semibold text-md text-center'>
      <h1 className='text-3xl font-serif'>Join as a client or freelancer</h1>
      <div className='w-full flex flex-col p-3 md:flex-row items-center justify-evenly gap-2 my-4 sm:gap-4'>
        <label
          className='cursor-pointer w-full md:w-auto'
          onClick={typeHandler}
          htmlFor='client'
        >
          <input
            type='radio'
            className='peer sr-only'
            name='type'
            value='client'
            id='client'
          />
          <div className='md:w-60 rounded-md bg-slate-100 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>

                  <p className='text-sm font-semibold uppercase text-gray-500'>
                    Client
                  </p>
                </div>

                <div>
                  <svg width='24' height='24' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z'
                    />
                  </svg>
                </div>
              </div>
              <div className='flex items-end justify-between text-lg'>
                <p>Hiring for a Project</p>
              </div>
            </div>
          </div>
        </label>
        <label
          className='cursor-pointer w-full md:w-auto'
          onClick={typeHandler}
          htmlFor='freelancer'
        >
          <input
            type='radio'
            className='peer sr-only'
            name='type'
            id='freelancer'
            value='freelancer'
          />
          <div className='w-full md:w-60 rounded-md bg-slate-100 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z'
                    />
                  </svg>

                  <p className='text-sm font-semibold uppercase text-gray-500'>
                    Freelancer
                  </p>
                </div>

                <div>
                  <svg width='24' height='24' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z'
                    />
                  </svg>
                </div>
              </div>
              <div className='flex items-end justify-between text-lg'>
                <p>Looking for Work</p>
              </div>
            </div>
          </div>
        </label>
      </div>
      <Button
        onClick={submitHandler}
        disabled={role == ''}
        className={role ? 'primary-btn' : 'disabled-btn'}
      >
        {buttonStatement}
      </Button>
      <div className='text-sm flex gap-1 font-normal'>
        <p>Already have an account?</p>
        <Link href='/auth' className='text-blue-500'>
          Log In
        </Link>
      </div>
    </Container>
  );
};

export default UserType;
