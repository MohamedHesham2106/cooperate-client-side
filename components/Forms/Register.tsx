import axios from 'lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

import { fetchCountries } from '../../lib/countries';

const Register: React.FC<Register> = ({ role }) => {
  const [countryList, setCountryList] = useState<country[]>();
  const [countryValue, setCountryValue] = useState('');
  const [selected, setSelected] = useState('');

  const [Input, setInput] = useState<Register>({
    firstname: '',
    lastname: '',
    role: role,
    username: '',
    email: '',
    password: '',
    repeat_password: '',
  });

  const router = useRouter();

  const InputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...Input, [name]: value });
    // console.log(Input);
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        firstname: Input.firstname,
        lastname: Input.lastname,
        role: Input.role,
        email: Input.email,
        password: Input.password,
        repeat_password: Input.repeat_password,
        country: selected,
        username: Input.username,
      });

      if (response) {
        // console.log(response.data);
        router.push('/auth');
      }
    } catch (error) {
      // console.error('err in register user :', error);
    }
  };

  const [open, setOpen] = useState(false);
  const countryListHandler = async () => {
    setCountryList(await fetchCountries());
  };
  useEffect(() => {
    countryListHandler();
  }, []);

  const Greeting =
    role === 'client'
      ? 'Sign up to hire talent'
      : 'Sign up to find work you love';

  return (
    <div className='max-w-xl mx-auto bg-white px-12 pt-8 my-20 border shadow rounded-md'>
      <h1 className='text-3xl text-center font-semibold'>{Greeting}</h1>
      <span className='h-[1px] my-10 bg-gray-300 block'></span>
      <form onSubmit={submitHandler}>
        <div className='grid gap-6 mb-6 lg:grid-cols-2'>
          <div>
            <input
              type='text'
              name='firstname'
              className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none '
              placeholder='First name'
              required
              value={Input.firstname}
              onChange={(e) => InputHandler(e)}
            />
          </div>
          <div>
            <input
              type='text'
              name='lastname'
              className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none '
              placeholder='Last name'
              required
              value={Input.lastname}
              onChange={(e) => InputHandler(e)}
            />
          </div>
        </div>
        <div className='mb-6'>
          <input
            type='text'
            name='username'
            className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none  '
            placeholder='Username'
            required
            value={Input.username}
            onChange={(e) => InputHandler(e)}
          />
        </div>
        <div className='mb-6'>
          <input
            type='email'
            name='email'
            className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none  '
            placeholder='Email'
            required
            value={Input.email}
            onChange={(e) => InputHandler(e)}
          />
        </div>
        <div className='mb-6'>
          <input
            type='password'
            name='password'
            className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none '
            placeholder='Password (8 or more characters)'
            required
            value={Input.password}
            onChange={(e) => InputHandler(e)}
          />
        </div>
        <div className='mb-6'>
          <input
            type='password'
            name='repeat_password'
            className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none '
            placeholder='Password (8 or more characters)'
            required
            value={Input.repeat_password}
            onChange={(e) => InputHandler(e)}
          />
        </div>
        <div className='mb-6'>
          <div className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
            <div
              onClick={() => setOpen(!open)}
              className={`bg-gray-50 w-full  flex items-center justify-between rounded ${
                !selected && 'text-gray-700'
              }`}
            >
              {selected
                ? selected?.length > 25
                  ? selected?.substring(0, 25) + '...'
                  : selected
                : 'Select Country'}
              <BiChevronDown size={20} />
            </div>
            <ul
              className={`bg-gray-50 overflow-y-auto ${
                open ? 'max-h-40 mt-3' : 'max-h-0'
              } `}
            >
              <div className='flex items-center px-2 sticky top-0 rounded-full bg-gray-300 mb-3'>
                <AiOutlineSearch size={18} className='text-gray-700' />
                <input
                  type='text'
                  value={countryValue}
                  onChange={(e) =>
                    setCountryValue(e.target.value.toLowerCase())
                  }
                  className='placeholder:text-gray-700 p-2 outline-none w-full rounded-full bg-gray-300'
                />
              </div>
              {countryList?.map((country) => (
                <li
                  key={country?.name}
                  className={`p-2 text-sm hover:bg-blue-500 hover:text-white
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              'bg-blue-500 text-white'
            }
            ${
              country?.name?.toLowerCase().startsWith(countryValue)
                ? 'block'
                : 'hidden'
            }`}
                  onClick={() => {
                    if (
                      country?.name?.toLowerCase() !== selected.toLowerCase()
                    ) {
                      setSelected(country?.name);
                      setOpen(false);
                      setCountryValue('');
                    }
                  }}
                >
                  {country?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex items-start mb-6'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
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
        <button
          type='submit'
          className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-base w-full  px-5 py-2.5 text-center'
        >
          Create my account
        </button>
      </form>
      <div className='text-sm flex py-5 gap-1 font-normal w-full justify-center '>
        <p>Already have an account?</p>
        <Link href='/auth' className='text-blue-500'>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Register;
