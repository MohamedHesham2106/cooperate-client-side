import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import { useAuthenticate } from '../../../context/AuthProvider';
import axiosInstance from '../../../utils/axios';

const DeleteAccountForm: FC = () => {
  const { uuid } = useAuthenticate();
  const [contactInfo, setContactInfo] = useState({
    password: '',
    repeatPassword: '',
  });
  const { SignOut } = useAuthenticate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    //console.log(contactInfo);
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, repeatPassword } = contactInfo;

    if (repeatPassword !== password) {
      toast.error('Passwords do not match.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });

      return;
    }
    await axiosInstance
      .delete(`/api/user/${uuid}/deleteAccount`, { data: { password } })
      .then((_response) => {
        toast.success('Good Bye.', {
          style: {
            border: '1px solid #07bd3a',
            padding: '16px',
          },
        });
        setTimeout(() => {
          SignOut();
        }, 2000);
      })
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        toast.error(message, {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      });
  };

  return (
    <div className='p-1 flex flex-col gap-2'>
      <h2 className='text-2xl font-semibold w-full text-center md:text-start'>
        Delete Account
      </h2>
      <span className='md:w-1/2 w-full border-t-2 border-black my-2 dark:border-gray-700 '></span>
      <span className='text-sm text-red-400'>
        <span className='font-bold'>Note:</span> This is irreversible action.
      </span>
      <Form OnSubmit={submitHandler} className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1 lg:w-1/2'>
          <label
            htmlFor='password'
            className='text-sm font-medium text-gray-600 dark:text-white'
          >
            Password
          </label>
          <Input
            name='password'
            type='password'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1 lg:w-1/2'>
          <label
            htmlFor='repeatPassword'
            className='text-sm font-medium text-gray-600 dark:text-white'
          >
            Confirm Password
          </label>
          <Input
            name='repeatPassword'
            type='password'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex justify-end'>
          <Button
            className='md:w-1/3 w-full text-white bg-red-500 p-3 rounded-xl hover:bg-red-600'
            type='submit'
          >
            Delete Account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteAccountForm;
