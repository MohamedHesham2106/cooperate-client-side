import { FC, MouseEvent, ReactNode } from 'react';

type IButton = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  width?: string;
  value?: string | number;
  type?: 'button' | 'submit' | 'reset';
};

const Button: FC<IButton> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  width,
  type = 'button',
  value,
}) => {
  const currWidth = width ? width : 'w-full';
  return (
    <button
      className={
        !className
          ? `text-white bg-blue-500 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-sm text-base ${currWidth}  px-5 py-2.5 text-center`
          : className
      }
      value={value}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
