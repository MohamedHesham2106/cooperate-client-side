import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../UI/Button';
import EducationSelect from '../../UI/EducationSelect';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
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
    role,
    company_name,
    birthDate,
    gender,
  } = user;
  const [selected, setSelected] = useState(education ? education : '');
  const [contactInfo, setContactInfo] = useState<IUser>({
    first_name,
    last_name,
    email,
    phone,
    country,
    education,
    address,
    company_name,
    birthDate,
    gender,
  });
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setContactInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    //console.log(contactInfo);
  };
  const selectUniversity = useCallback((selected: string) => {
    setSelected(selected);
  }, []);
  useEffect(() => {
    if (selected !== education) {
      setContactInfo((prevUserInfo) => ({
        ...prevUserInfo,
        education: selected,
      }));
    }
  }, [education, selected]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isContactInfoChanged =
      contactInfo.first_name !== first_name ||
      contactInfo.last_name !== last_name ||
      contactInfo.email !== email ||
      contactInfo.phone !== phone ||
      contactInfo.country !== country ||
      selected !== education ||
      contactInfo.address !== address ||
      contactInfo.gender !== gender ||
      (birthDate &&
        contactInfo.birthDate &&
        new Date(contactInfo.birthDate).toISOString().split('T')[0] !==
          new Date(birthDate).toISOString().split('T')[0]);

    // If there were no changes made, return from the function
    if (!isContactInfoChanged) {
      toast.error('No changes were made.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
      return;
    }

    await axiosInstance
      .patch(`/api/user/${user._id}`, {
        new_first_name: contactInfo.first_name,
        new_last_name: contactInfo.last_name,
        new_email: contactInfo.email,
        new_phone: contactInfo.phone,
        new_address: contactInfo.address,
        new_education: selected,
        new_company_name: contactInfo.company_name,
        new_birthDate: contactInfo.birthDate,
        new_gender: contactInfo.gender,
      })
      .then((_response) => {
        toast.success('Updated Information Successfully.', {
          style: {
            border: '1px solid #07bd3a',
            padding: '16px',
          },
        });
        setTimeout(() => {
          router.reload();
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
    <div className='p-1 flex flex-col gap-2 dark:bg-gray-800'>
      <div className='flex gap-2 items-center justify-center md:justify-start pl-8 md:pl-0  w-full'>
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

      <span className='md:w-1/2 w-full border-t-2 border-black my-2 dark:border-gray-700 '></span>
      <Form OnSubmit={submitHandler} className='flex flex-col gap-3'>
        <div className='grid gap-6  lg:grid-cols-2'>
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='first_name'
              className='text-sm font-medium text-gray-600 dark:text-white'
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
              className='text-sm font-medium text-gray-600  dark:text-white'
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
          <label
            htmlFor='email'
            className='text-sm font-medium text-gray-600  dark:text-white'
          >
            Email
          </label>
          <Input
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
            className='text-sm font-medium text-gray-600  dark:text-white'
          >
            Education
          </label>
          <EducationSelect
            onSelect={selectUniversity}
            defaultValue={education}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='phone'
            className='text-sm font-medium text-gray-600  dark:text-white'
          >
            Phone Number
          </label>
          <Input
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
            className='text-sm font-medium text-gray-600  dark:text-white'
          >
            Address
          </label>
          <Input
            name='address'
            type='text'
            defaultValue={address}
            placeholder='Address'
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='address'
            className='text-sm font-medium text-gray-600  dark:text-white'
          >
            Birth Date
          </label>
          <input
            name='birthDate'
            onChange={handleChange}
            type='date'
            defaultValue={
              birthDate
                ? new Date(birthDate).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
            }
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full outline-none  p-2.5 dark:bg-gray-900 dark:text-white dark:border-gray-900  '
            placeholder='Select BirthDate'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='address'
            className='text-sm font-medium text-gray-600  dark:text-white'
          >
            Gender
          </label>
          <select
            className='w-full border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none dark:bg-gray-900 dark:text-white'
            defaultValue={gender}
            name='gender'
            onChange={handleChange}
          >
            <option disabled value=''>
              Choose a Gender
            </option>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
        </div>

        {role === 'client' && (
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='company_name'
              className='text-sm font-medium text-gray-600  dark:text-white'
            >
              Company Name
            </label>
            <Input
              ContainerClass='mb-6'
              name='company_name'
              type='text'
              defaultValue={company_name}
              placeholder='Company Name'
              onChange={handleChange}
              required={true}
            />
          </div>
        )}

        <div className='flex justify-end '>
          <Button type='submit' width='md:w-1/3 w-full'>
            Update Information
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactInfo;
