import { FC, ReactNode } from 'react';

interface IMessage {
  message?: string;
  className?: string;
  icon?: ReactNode;
}
const Success: FC<IMessage> = ({ message, className, icon }) => {
  return (
    <span
      className={
        className
          ? className
          : 'bg-green-300 text-green-600 flex items-center gap-3 p-4 rounded-sm mb-8'
      }
    >
      {icon}
      <span>{message}</span>
    </span>
  );
};

export default Success;
