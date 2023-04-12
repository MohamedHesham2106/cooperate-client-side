import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '../../UI/Button';
import CustomSelect from '../../UI/CustomSelect';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import { useValidate } from '../../../hooks/useValidate';
import axiosInstance from '../../../utils/axios';
import { fetchCountries } from '../../../utils/countries';

const CreateUsers: React.FC = () => {
  // State variables for the country list and the selected country
  const [countryList, setCountryList] = useState<IOption[]>();
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<string | undefined>();
  const initialUserInfo: IRegister = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    repeat_password: '',
  };

  const [
    userInfo,
    errors,
    isValid,
    { onBlur: handleBlur, onChange: handleChange },
  ] = useValidate(initialUserInfo);

  // Callback function for selecting a country
  const selectCountryHandler = useCallback((selected: string) => {
    setCountry(selected);
  }, []);
  // Callback function for selecting a role
  const selectedRoleHandler = useCallback((selected: string) => {
    setRole(selected);
  }, []);
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

  // Form submit handler
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid && country && role) {
      // Send registration data to the server and redirect to the login page
      await axiosInstance
        .post('/api/register', {
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          role: role,
          email: userInfo.email,
          password: userInfo.password,
          repeat_password: userInfo.repeat_password,
          country: country,
          username: userInfo.username,
        })
        .then((_response) => {
          toast.success('User Created.');
          setCountry(''); // Reset the selected country
          setRole(undefined); // Reset the selected role
        })
        .catch((error) => {
          const err = error as IError;
          const { message } = err.response.data;
          toast.error(message);
        });
    }
  };
  const roles = [
    { id: '0', name: 'admin' },
    { id: '1', name: 'freelancer' },
    { id: '2', name: 'client' },
  ];
  return (
    <Form
      className='gap-5 flex flex-col border rounded-md shadow'
      OnSubmit={submitHandler}
    >
      <h5 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal  bg-gray-100 px-4 md:px-10 py-4 md:py-7'>
        Create User
      </h5>
      <div className='p-5'>
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

        <CustomSelect
          label='Country'
          options={countryList}
          onSelect={selectCountryHandler}
        />

        <CustomSelect
          label='Roles'
          options={roles}
          onSelect={selectedRoleHandler}
        />
        <div className='flex justify-end'>
          <Button type='submit' width='w-1/3'>
            Create User
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CreateUsers;
