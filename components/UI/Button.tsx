import { FC, MouseEvent, ReactNode } from 'react';

type IButton = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  width?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button: FC<IButton> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  width,
  type = 'button',
}) => {
  const currWidth = width ? 'w-' + width : 'w-full';
  return (
    <button
      className={
        !className
          ? `text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-base ${currWidth}  px-5 py-2.5 text-center`
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
