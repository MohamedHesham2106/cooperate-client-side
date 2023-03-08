import { FC, useState } from 'react';

import Button from '../../UI/Button';
import Error from '../../UI/Error';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import Success from '../../UI/Success';
import axiosInstance from '../../../utils/axios';
import { getCookie } from '../../../utils/cookie';

interface IProps {
  user: IUser;
}

const ChangePassword: FC<IProps> = ({ user }) => {
  const { _id } = user;
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

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
  const clearMessages = () => {
    setSuccess('');
    setError('');
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = contactInfo;
    if (oldPassword === newPassword) {
      setError('Your new password cannot be same as your current password.');
      setTimeout(clearMessages, 5000);
      return;
    }
    if (confirmPassword !== newPassword) {
      setError('Passwords do not match.');
      setTimeout(clearMessages, 5000);
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
        setSuccess('Password Changed Successfully.');
        setTimeout(clearMessages, 5000);
      })
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        setError(message);
        setTimeout(clearMessages, 5000);
      });
  };

  return (
    <div className='p-1 flex flex-col gap-2'>
      <h2 className='text-2xl font-semibold'>Change Password</h2>

      <span className='w-1/2 border-t-2 border-black my-2 '></span>
      {error && <Error message={error} />}
      {success && <Success message={success} />}
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
