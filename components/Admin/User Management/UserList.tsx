import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SlOptions } from 'react-icons/sl';
import useSWR from 'swr';

import { ModalManagerContext } from '../../../context/ModalManager';
import axiosInstance from '../../../utils/axios';
import { getCookie } from '../../../utils/cookie';

const UserList = () => {
  const [show, setShow] = useState<string | undefined>();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  const { displayModal } = useContext(ModalManagerContext);

  const handleViewUser = (user: IUser) => {
    displayModal('viewUser', { user });
  };
  const handleModifyUser = (user: IUser) => {
    displayModal('modifyUser', { user });
  };

  const { data, isLoading } = useSWR(
    '/api/user',
    async (url) => {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: 'Bearer ' + getCookie('jwt_access'), // Replace with your authorization header
          'Content-Type': 'application/json', // Replace with your desired content type header
        },
      });
      const data = await response.data;
      return data;
    },
    {
      refreshInterval: 1000,
    }
  );
  const handleNewData = (newData: IUser[]) => {
    setUsers(newData);
  };

  useEffect(() => {
    if (data) {
      handleNewData(data.users);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const [searchFirst, searchLast] = searchTerm.split(' ');
  const filteredUsers = users
    ?.filter((user: IUser) =>
      searchLast
        ? ((user.first_name &&
            user.first_name
              .toLowerCase()
              .includes(searchFirst?.toLowerCase())) ||
            (user.last_name &&
              user.last_name
                .toLowerCase()
                .includes(searchFirst?.toLowerCase()))) &&
          ((user.first_name &&
            user.first_name
              .toLowerCase()
              .includes(searchLast?.toLowerCase())) ||
            (user.last_name &&
              user.last_name.toLowerCase().includes(searchLast?.toLowerCase())))
        : user.first_name &&
          user.first_name.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    .filter((user: IUser) => {
      if (selectedRoles.length === 0) {
        return true;
      } else {
        return selectedRoles.includes(user.role as string);
      }
    });
  return (
    <div className='w-full shadow bg-white dark:bg-gray-700 rounded-t-lg max-w-full '>
      <div className='px-4 md:px-5 py-4 md:py-7 bg-gray-100 rounded-t-lg  dark:bg-gray-800 '>
        <div className='sm:flex items-center justify-between'>
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white '>
            Users List
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 items-center px-2 gap-4 bg-gray-100 border-t dark:bg-gray-800 dark:border-gray-600'>
        <div className='relative'>
          <AiOutlineSearch
            size={20}
            className='absolute z-[5] cursor-pointer top-[15px] left-4'
          />
          <input
            className='relative text-sm leading-none border text-gray-600 bg-white  rounded  w-full px-10 py-4 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-800'
            type='text'
            placeholder='Search for Users'
            onChange={handleSearchChange}
          />
        </div>
        <div className='p-5'>
          <h6 className='text-lg font-bold mb-2'>Role</h6>
          <div className='flex items-center gap-4'>
            <div>
              <label className='flex items-center space-x-1'>
                <input
                  type='checkbox'
                  name='freelancer'
                  value='freelancer'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRoles([...selectedRoles, e.target.value]);
                    } else {
                      setSelectedRoles(
                        selectedRoles.filter((role) => role !== e.target.value)
                      );
                    }
                  }}
                  className=' bg-white bg-check border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none'
                />
                <span className='font-normal text-gray-700 text-xs dark:text-white'>
                  Freelancers
                </span>
              </label>
            </div>
            <div>
              <label className='flex items-center space-x-1'>
                <input
                  type='checkbox'
                  name='client'
                  value='client'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRoles([...selectedRoles, e.target.value]);
                    } else {
                      setSelectedRoles(
                        selectedRoles.filter((role) => role !== e.target.value)
                      );
                    }
                  }}
                  className=' bg-white bg-check border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none'
                />
                <span className='font-normal text-gray-700 text-xs dark:text-white'>
                  Clients
                </span>
              </label>
            </div>
            <div>
              <label className='flex items-center space-x-1'>
                <input
                  type='checkbox'
                  name='admin'
                  value='admin'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRoles([...selectedRoles, e.target.value]);
                    } else {
                      setSelectedRoles(
                        selectedRoles.filter((role) => role !== e.target.value)
                      );
                    }
                  }}
                  className=' bg-white bg-check border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none'
                />
                <span className='font-normal text-gray-700 text-xs dark:text-white'>
                  Admins
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto min-h-screen dark:bg-gray-700'>
        <table className='w-full'>
          <thead>
            <tr className='h-16 w-full text-sm leading-none text-gray-800 dark:text-white'>
              <th className='font-bold text-left '>Full Name</th>
              <th className='font-bold text-left '>Role</th>
              <th className='font-bold text-left '>Created At</th>
              <th className='font-bold text-left '>Latest Update</th>
              <th className='font-bold text-left '>E-Mail</th>
              <th className='font-bold text-left '>Verified</th>
              <th className='font-bold text-left '>Modify</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {!isLoading &&
              filteredUsers.map((user: IUser) => (
                <tr
                  key={user._id}
                  className='h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-800'
                >
                  <td>
                    <div className='flex items-center gap-5'>
                      <div className='w-10 h-10'>
                        <Image
                          width={50}
                          height={50}
                          className=' w-[40px] h-[40px] object-cover rounded-md border border-gray-900'
                          src={
                            user.imageUrl
                              ? user.imageUrl
                              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                          }
                          alt={
                            user.username
                              ? user.username
                              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                          }
                        />
                      </div>
                      <div>
                        <p className='font-medium capitalize'>
                          {user.first_name} {user.last_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='text-sm font-medium leading-none text-gray-800 capitalize dark:text-white'>
                      {user.role}
                    </p>
                  </td>
                  <td>
                    <p className='font-medium'>
                      {user.createdAt &&
                        new Date(user.createdAt).toLocaleDateString('en-GB')}
                    </p>
                  </td>
                  <td>
                    <p className='font-medium'>
                      {user.updatedAt &&
                        new Date(user.updatedAt).toLocaleDateString('en-GB')}
                    </p>
                  </td>
                  <td>
                    <p className='font-medium'>{user.email}</p>
                  </td>
                  <td>
                    <p
                      className={`font-bold text-xs text-center ring-2 ring-offset-1 text-white px-2 rounded-full py-1 ${
                        user.isEmailVerified
                          ? 'bg-green-500 ring-green-500'
                          : 'bg-red-500 ring-red-500'
                      }`}
                    >
                      {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </td>

                  <td>
                    {show == user._id ? (
                      <button
                        onClick={() => setShow(undefined)}
                        className='focus:outline-none pl-7'
                      >
                        <SlOptions size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShow(user._id)}
                        className='focus:outline-none pl-7'
                      >
                        <SlOptions size={20} />
                      </button>
                    )}
                    {show == user._id && (
                      <div className=' bg-white shadow-lg w-24 absolute right-0 z-30 mr-6  rounded-sm dark:bg-gray-900 dark:text-white'>
                        <div
                          onClick={() => handleViewUser(user)}
                          className='text-xs w-full hover:bg-blue-500 py-4 px-4 cursor-pointer  rounded-sm hover:text-white'
                        >
                          <p>View</p>
                        </div>
                        <div
                          onClick={() => handleModifyUser(user)}
                          className='text-xs w-full hover:bg-blue-500 py-4 px-4 cursor-pointer  rounded-sm hover:text-white'
                        >
                          <p>Edit</p>
                        </div>
                        <div className='text-xs w-full hover:bg-blue-500 py-4 px-4 cursor-pointer  rounded-sm hover:text-white'>
                          <p>Delete</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
