import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import actions from '../../redux/actions';
const Login: React.FC = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [Input, setInput] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  const InputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...Input, [name]: value });
    // console.log(Input);
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(
        actions.authenticate({ email: Input.email, password: Input.password })
      );
    } catch (error) {
      console.error('err in register user :', error);
    }
  };
  return (
    <div className='max-w-xl mx-auto bg-white px-12 pt-8 my-20 border shadow rounded-md'>
      <h1 className='text-3xl text-center font-semibold'>
        Login to Coo<span className='text-orange-400 font-bold'>/</span>Rate
      </h1>
      <span className='h-[1px] my-10 bg-gray-300 block'></span>
      <form onSubmit={submitHandler}>
        <div className='mb-6'>
          <input
            type='email'
            name='email'
            className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none '
            placeholder='Email'
            required
            value={Input.email}
            onChange={(e) => InputHandler(e)}
          />
        </div>
        <div className='bg-gray-50 mb-6 flex border border-gray-300 border-r-0 rounded-lg '>
          <input
            type={passwordType}
            name='password'
            className=' border  text-gray-600 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5 border-r-0 outline-none'
            placeholder='Password (8 or more characters)'
            required
            value={Input.password}
            onChange={(e) => InputHandler(e)}
          />
          <button
            type='button'
            className='pr-2 border rounded-r-lg px-2'
            onClick={togglePassword}
          >
            {passwordType === 'password' ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type='submit'
          className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-base w-full  px-5 py-2.5 text-center'
        >
          Login to Cooperate
        </button>
      </form>
      <div className='text-sm flex py-5 gap-1 font-normal w-full justify-center '>
        <p>Don&apos;t have Cooperate account?</p>
        <Link href='/signup' className='text-blue-500'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
