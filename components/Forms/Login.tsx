import Link from 'next/link';
import { FC, useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import Button from '../UI/Button';
import Container from '../UI/Container';
import Form from '../UI/Form';
import Input from '../UI/Input';
import { AuthContext } from '../../context/AuthContext';

const Login: FC = () => {
  // Initialize state for password input type and user information
  const [passwordType, setPasswordType] = useState('password');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const { Authenticate } = useContext(AuthContext);

  // Function to toggle password hide/show
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  // Function to handle input changes and update user information state
  const InputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Function to handle form submission and authenticate user using Redux actions and router
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Authenticate(userInfo.email, userInfo.password);
  };

  return (
    <Container className='max-w-xl mx-auto bg-white px-12 pt-8 my-20 border shadow rounded-md'>
      <h1 className='text-3xl text-center font-semibold'>
        Login to Coo<span className='text-orange-400 font-bold'>/</span>Rate
      </h1>
      <span className='h-[1px] my-10 bg-gray-300 block'></span>

      <Form OnSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          ContainerClass='mb-6'
          value={userInfo.email}
          required={true}
          onChange={(e) => InputHandler(e)}
          placeholder='Email'
        />

        <div className='bg-gray-50 mb-6 flex border border-gray-300 border-r-0 rounded-lg '>
          <Input
            type={passwordType}
            name='password'
            className=' border text-gray-600 bg-gray-50 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5 border-r-0 outline-none'
            value={userInfo.password}
            required={true}
            onChange={(e) => InputHandler(e)}
            ContainerClass='w-full'
            placeholder='Password (8 or more characters)'
          />
          <Button
            type='button'
            className='pr-2 border rounded-r-lg px-2'
            onClick={togglePassword}
          >
            {passwordType === 'password' ? <FiEyeOff /> : <FiEye />}
          </Button>
        </div>

        <Button type='submit'>Login to Cooperate</Button>
      </Form>
      <div className='text-sm flex py-5 gap-1 font-normal w-full justify-center '>
        <p>Don&apos;t have Cooperate account?</p>
        <Link href='/signup' className='text-blue-500'>
          Sign Up
        </Link>
      </div>
    </Container>
  );
};

export default Login;
