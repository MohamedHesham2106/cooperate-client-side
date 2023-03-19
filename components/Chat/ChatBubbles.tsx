import { FC, useEffect, useState } from 'react';

import { getTimeDifference } from '../../utils/date';

interface Props {
  isOwn: boolean;
  message: string;
  name: string;
  createdAt: string;
}

const ChatBubbles: FC<Props> = ({ isOwn, message, name, createdAt }) => {
  const bubbleContainer = isOwn
    ? 'col-start-6 col-end-13 p-3 rounded-lg'
    : 'col-start-1 col-end-8 p-3 rounded-lg';

  const bubbleHead = isOwn ? 'bg-green-400' : 'bg-red-300';
  const bubbleBg = isOwn ? 'bg-blue-200' : 'bg-white border';
  const [date, setDate] = useState<string | undefined>();
  useEffect(() => {
    // console.log('useEffect called with createdAt =', createdAt);
    setDate(getTimeDifference(new Date(createdAt).getTime()));
  }, [createdAt]);
  return (
    <div className={bubbleContainer}>
      <div className='flex flex-col gap-2'>
        <div
          className={`flex items-center justify-start gap-2 ${
            isOwn ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full ${bubbleHead} flex-shrink-0`}
          >
            {isOwn ? 'Me' : name}
          </div>
          <div
            className={`relative  text-sm ${bubbleBg} py-2 px-4 shadow rounded-xl`}
          >
            <div>{message}</div>
          </div>
        </div>
        <span
          className={`text-[10px] text-gray-400 ${
            isOwn ? 'text-end' : 'text-start'
          }`}
        >
          {date}
        </span>
      </div>
    </div>
  );
};

export default ChatBubbles;
