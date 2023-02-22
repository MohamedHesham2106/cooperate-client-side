import { FC, MouseEvent, ReactNode } from 'react';

type IButton = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button: FC<IButton> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      className={
        !className
          ? 'text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-base w-full  px-5 py-2.5 text-center'
          : className
      }
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
