import { FC, useEffect, useState } from 'react';

import axiosInstance from '../../utils/axios';

interface IProps {
  receiverId: string;
  onClick: (id: string) => void;
}

const ChatName: FC<IProps> = ({ receiverId, onClick }) => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    const getUser = async () => {
      await axiosInstance
        .get(`/api/user/${receiverId}`)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUser();
  }, [receiverId]);

  const handleClick = () => {
    onClick(receiverId);
  };

  return (
    <div
      onClick={handleClick}
      className='grid grid-cols-1 md:grid-cols-[1fr_9fr] gap-2 bg-blue-400  items-center shadow-md   rounded-sm hover:bg-blue-800 py-2 px-5 cursor-pointer'
    >
      <div className='flex items-center text-sm justify-center p-1 bg-orange-200 rounded-full'>
        {user?.first_name?.charAt(0)}
        {user?.last_name?.charAt(0)}
      </div>
      <div className='hidden md:block  text-base font-medium text-white'>
        {user?.first_name} {user?.last_name}
      </div>
    </div>
  );
};

export default ChatName;
