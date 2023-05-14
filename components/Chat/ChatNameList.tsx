import { FC, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import ChatName from './ChatName';
import axiosInstance from '../../utils/axios';

interface IProps {
  receiverIds: string[];
  onClick: (id: string | undefined) => void;
  latestMessages: IChat[];
}
const ChatNameList: FC<IProps> = ({ receiverIds, onClick, latestMessages }) => {
  // Initialize state variables
  const [users, setUsers] = useState<IUser[] | undefined>();
  const [searchValue, setSearchValue] = useState('');

  // Filter users based on search value
  const filteredUsers = users?.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return fullName.toLowerCase().includes(searchValue.toLowerCase());
  });

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Retrieve users based on receiver IDs
  useEffect(() => {
    const getUsers = async () => {
      const receiver: IUser[] = await Promise.all(
        receiverIds.map(async (receiverId) => {
          const response = await axiosInstance.get(`/api/user/${receiverId}`);
          return response.data.user;
        })
      );
      setUsers(receiver);
    };
    getUsers();
  }, [receiverIds]);

  return (
    <div className=' border lg:col-span-1 dark:border-gray-800  dark:bg-gray-800'>
      <h2 className='text-3xl font-bold text-white text-center p-5 dark:bg-gray-800 bg-blue-500'>
        Chats
      </h2>
      <div className='mx-3 my-3'>
        <div className='relative text-gray-600 dark:text-white'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <AiOutlineSearch
              className='text-gray-300 dark:text-white'
              size={20}
            />
          </span>
          <input
            type='text'
            className='block w-full py-2 pl-10 bg-gray-100 rounded outline-none dark:bg-gray-900  dark:text-white'
            name='search'
            placeholder='Search'
            value={searchValue}
            onChange={handleSearch}
            required
          />
        </div>
      </div>

      <ul className='overflow-auto lg:h-[33rem]'>
        {latestMessages &&
          filteredUsers &&
          filteredUsers.map((user: IUser, index) => (
            <ChatName
              latestMessage={latestMessages[index]}
              key={user._id}
              onClick={onClick}
              user={user}
            />
          ))}
      </ul>
    </div>
  );
};

export default ChatNameList;
