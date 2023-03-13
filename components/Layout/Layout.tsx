import { FC, Fragment } from 'react';

import FloatingActionButton from './FloatingActionButton';
import Footer from './Footer';
import MainNavigation from './MainNavigation';

type IProps = {
  children: JSX.Element;
  font: string;
};
const Layout: FC<IProps> = ({ children, font }) => {
  return (
    <Fragment>
      <MainNavigation font={font} />
      <main className={font}>{children}</main>
      <FloatingActionButton />
      <Footer />
    </Fragment>
  );
};

export default Layout;
