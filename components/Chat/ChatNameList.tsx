import { FC } from 'react';
import { BsFillChatRightDotsFill } from 'react-icons/bs';

import ChatName from './ChatName';
interface IProps {
  receiverIds: string[];
  onClick: (id: string) => void;
}
const ChatNameList: FC<IProps> = ({ receiverIds, onClick }) => {
  return (
    <div className=' rounded-l-3xl bg-blue-500 flex flex-col h-full'>
      <h1 className='text-2xl font-medium mb-2 p-5 text-center flex items-center gap-2 justify-center'>
        <span className='px-2 pt-2.5 pb-2 rounded-full shadow bg-orange-300 flex items-center'>
          <BsFillChatRightDotsFill size={15} className='text-white' />
        </span>
        <span className='text-white font-extrabold'>Chats</span>
      </h1>
      <div className='flex flex-col gap-2'>
        {receiverIds.map((receiver) => {
          return (
            <ChatName receiverId={receiver} key={receiver} onClick={onClick} />
          );
        })}
      </div>
    </div>
  );
};

export default ChatNameList;
