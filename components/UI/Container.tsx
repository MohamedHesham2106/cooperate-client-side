import { FC, ReactNode } from 'react';

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container: FC<IContainer> = ({ children, className }) => {
  return <section className={className ?? ''}>{children}</section>;
};

export default Container;
