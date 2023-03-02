import { FC, FormEvent, ReactNode } from 'react';

interface IFormProps {
  children: ReactNode;
  OnSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const Form: FC<IFormProps> = ({ children, OnSubmit, className }) => {
  return (
    <form onSubmit={OnSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
