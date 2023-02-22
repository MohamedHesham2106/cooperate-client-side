import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';

import Button from '../UI/Button';
import Container from '../UI/Container';
import CountrySelect from '../UI/CountrySelect';
import Error from '../UI/Error';
import Form from '../UI/Form';
import Input from '../UI/Input';
import { useValidate } from '../../hooks/useValidate';
import axios from '../../utils/axios';
import { fetchCountries } from '../../utils/countries';

const Register: React.FC<IRegister> = ({ role }) => {
  // State variables for the country list and the selected country
  const [countryList, setCountryList] = useState<ICountry[]>();
  const [selected, setSelected] = useState('');

  // Initial user info for the registration form
  const initialUserInfo: IRegister = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    repeat_password: '',
  };

  // Initiate Error
  const [error, setError] = useState<string>();

  // Validation Hook
  const [
    userInfo,
    errors,
    isValid,
    { onBlur: handleBlur, onChange: handleChange },
  ] = useValidate(initialUserInfo);
  const router = useRouter();

  // Callback function for selecting a country
  const selectCountryHandler = useCallback((selected: string) => {
    setSelected(selected);
  }, []);

  // Form submit handler
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      // Send registration data to the server and redirect to the login page
      await axios
        .post('/api/register', {
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          role: role,
          email: userInfo.email,
          password: userInfo.password,
          repeat_password: userInfo.repeat_password,
          country: selected,
          username: userInfo.username,
        })
        .then((_response) => router.push('/auth'))
        .catch((error) => {
          const err = error as IError;
          const { message } = err.response.data;
          setError(message);
        });
    }
  };
  // Function to fetch the list of countries
  const countryListHandler = async function () {
    const countryList = await fetchCountries();
    setCountryList(countryList);
  };
  // Fetch the list of countries
  useEffect(() => {
    if (countryList === undefined) {
      countryListHandler();
    }
  }, [countryList]);

  // Greeting message based on the user's role
  const Greeting =
    role === 'client'
      ? 'Sign up to hire talent'
      : 'Sign up to find work you love';

  return (
    <Container className='max-w-xl mx-auto bg-white px-12 pt-8 my-20 border shadow rounded-md'>
      <h1 className='text-3xl text-center font-semibold'>{Greeting}</h1>
      <span className='h-[1px] my-10 bg-gray-300 block'></span>
      {error && <Error message={error} icon={<FaWindowClose />} />}
      <Form OnSubmit={submitHandler}>
        <div className='grid gap-6 mb-6 lg:grid-cols-2'>
          <Input
            name='firstname'
            value={userInfo.firstname}
            onChange={handleChange}
            placeholder='First name'
            required={true}
            errorMessage={errors.firstname}
            onBlur={handleBlur}
          />
          <Input
            name='lastname'
            value={userInfo.lastname}
            onChange={handleChange}
            placeholder='Last name'
            required={true}
            errorMessage={errors.lastname}
            onBlur={handleBlur}
          />
        </div>
        <Input
          ContainerClass='mb-6'
          name='username'
          value={userInfo.username}
          onChange={handleChange}
          placeholder='Username'
          required={true}
          errorMessage={errors.username}
          onBlur={handleBlur}
        />
        <Input
          ContainerClass='mb-6'
          name='email'
          type='email'
          value={userInfo.email}
          onChange={handleChange}
          placeholder='Email'
          required={true}
          errorMessage={errors.email}
          onBlur={handleBlur}
        />
        <Input
          ContainerClass='mb-6'
          name='password'
          type='password'
          value={userInfo.password}
          onChange={handleChange}
          placeholder='Password (8 or more characters)'
          required={true}
          errorMessage={errors.password}
          onBlur={handleBlur}
        />
        <Input
          ContainerClass='mb-6'
          name='repeat_password'
          type='password'
          value={userInfo.repeat_password}
          onChange={handleChange}
          placeholder='Confirm Password'
          required={true}
          errorMessage={errors.repeat_password}
          onBlur={handleBlur}
        />
        <div className='mb-6'>
          <CountrySelect
            countryList={countryList}
            onSelect={selectCountryHandler}
          />
        </div>
        <div className='flex items-start mb-6'>
          <div className='flex items-center h-5'>
            <input
              id='policy'
              type='checkbox'
              value=''
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 '
              required
            />
          </div>
          <label
            htmlFor='remember'
            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Yes, I understand and agree to the{' '}
            <Link
              href='#'
              className='text-blue-600 hover:underline dark:text-blue-500'
            >
              Cooperate Terms of Service
            </Link>
            , including{' '}
            <Link
              href='#'
              className='text-blue-600 hover:underline dark:text-blue-500'
            >
              User Agreement
            </Link>{' '}
            and{' '}
            <Link
              href='#'
              className='text-blue-600 hover:underline dark:text-blue-500'
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        <Button
          type='submit'
          className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-base w-full  px-5 py-2.5 text-center'
        >
          Create my account
        </Button>
      </Form>
      <div className='text-sm flex py-5 gap-1 font-normal w-full justify-center '>
        <p>Already have an account?</p>
        <Link href='/auth' className='text-blue-500'>
          Log In
        </Link>
      </div>
    </Container>
  );
};

export default Register;
