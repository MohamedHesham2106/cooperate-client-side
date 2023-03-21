import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import axiosInstance from '../../../utils/axios';
import { getCookie } from '../../../utils/cookie';

interface IProps {
  user: IUser;
}

const ChangePassword: FC<IProps> = ({ user }) => {
  const { _id } = user;

  const [contactInfo, setContactInfo] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    console.log(contactInfo);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = contactInfo;
    if (oldPassword === newPassword) {
      toast.error(
        'Your new password cannot be same as your current password.',
        {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        }
      );
      return;
    }
    if (confirmPassword !== newPassword) {
      toast.error('Passwords do not match.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });

      return;
    }
    await axiosInstance
      .put(
        `/api/user/change-password`,
        {
          oldPassword,
          newPassword,
          userId: _id,
        },
        { headers: { Authorization: `Bearer ${getCookie('jwt_access')}` } }
      )
      .then((_response) => {
        toast.success('Password Changed Successfully.', {
          style: {
            border: '1px solid #07bd3a',
            padding: '16px',
          },
        });
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
        Change Password
      </h2>

      <span className='md:w-1/2 w-full border-t-2 border-black my-2 '></span>
      <Form OnSubmit={submitHandler}>
        <div className='flex flex-col gap-1 lg:w-1/2'>
          <label
            htmlFor='OldPassword'
            className='text-sm font-medium text-gray-600'
          >
            Current Password
          </label>
          <Input
            ContainerClass='mb-6'
            name='oldPassword'
            type='password'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1 lg:w-1/2'>
          <label
            htmlFor='newPassword'
            className='text-sm font-medium text-gray-600'
          >
            New Password
          </label>
          <Input
            ContainerClass='mb-6'
            name='newPassword'
            type='password'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1 lg:w-1/2'>
          <label
            htmlFor='confirmPassword'
            className='text-sm font-medium text-gray-600'
          >
            Confirm New Password
          </label>
          <Input
            ContainerClass='mb-6'
            name='confirmPassword'
            type='password'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' width='md:w-1/3 w-full'>
            Change Password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
