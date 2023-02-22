import { FC, FormEvent, ReactNode } from 'react';

interface IFormProps {
  children: ReactNode;
  OnSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<IFormProps> = ({ children, OnSubmit }) => {
  return <form onSubmit={OnSubmit}>{children}</form>;
};

export default Form;
