import { FC, useState } from 'react';

import Button from '../../UI/Button';
import Error from '../../UI/Error';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import Success from '../../UI/Success';
import axiosInstance from '../../../utils/axios';

interface IProps {
  user: IUser;
}

const ContactInfo: FC<IProps> = ({ user }) => {
  const {
    first_name,
    last_name,
    email,
    country,
    isEmailVerified,
    phone,
    education,
    address,
  } = user;
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [contactInfo, setContactInfo] = useState<IUser>({
    first_name,
    last_name,
    email,
    phone,
    country,
    education,
    address,
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
    const isContactInfoChanged =
      JSON.stringify(contactInfo) !==
      JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        country,
        education,
        address,
      });

    // If there were no changes made, return from the function
    if (!isContactInfoChanged) {
      return;
    }

    await axiosInstance
      .patch(`/api/user/${user._id}`, {
        new_first_name: contactInfo.first_name,
        new_last_name: contactInfo.last_name,
        new_email: contactInfo.email,
        new_phone: contactInfo.phone,
        new_address: contactInfo.address,
        new_education: contactInfo.education,
      })
      .then((_response) => {
        setSuccess('Updated Account Successfully.');
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
      <div className='flex gap-2 items-center'>
        <h2 className='text-2xl font-semibold'>Contact Information</h2>
        <span
          className={`px-4 py-1 font-bold mt-1  text-sm rounded-full ${
            isEmailVerified
              ? 'text-green-600  bg-green-200'
              : 'text-red-600  bg-red-200'
          } flex items-center `}
        >
          {isEmailVerified ? 'Verified' : 'Not Verified'}
        </span>
      </div>

      <span className='w-1/2 border-t-2 border-black my-2 '></span>
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <Form OnSubmit={submitHandler}>
        <div className='grid gap-6 mb-6 lg:grid-cols-2'>
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='first_name'
              className='text-sm font-medium text-gray-600'
            >
              First Name
            </label>
            <Input
              name='first_name'
              defaultValue={first_name} // set initial value to prop value
              placeholder='First name'
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor='last_name'
              className='text-sm font-medium text-gray-600'
            >
              Last Name
            </label>
            <Input
              name='last_name'
              defaultValue={last_name}
              placeholder='Last name'
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='text-sm font-medium text-gray-600'>
            Email
          </label>
          <Input
            ContainerClass='mb-6'
            name='email'
            type='email'
            defaultValue={email}
            placeholder='Email'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='education'
            className='text-sm font-medium text-gray-600'
          >
            Education
          </label>
          <Input
            ContainerClass='mb-6'
            name='education'
            type='text'
            defaultValue={education}
            placeholder='Education'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='phone' className='text-sm font-medium text-gray-600'>
            Phone Number
          </label>
          <Input
            ContainerClass='mb-6'
            name='phone'
            type='text'
            defaultValue={phone}
            placeholder='phone'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='address'
            className='text-sm font-medium text-gray-600'
          >
            Address
          </label>
          <Input
            ContainerClass='mb-6'
            name='address'
            type='text'
            defaultValue={address}
            placeholder='Address'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' width='w-1/3'>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactInfo;
