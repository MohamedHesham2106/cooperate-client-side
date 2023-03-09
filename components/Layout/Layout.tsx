import { FC, Fragment } from 'react';

import FloatingActionButton from './FloatingActionButton';
import Footer from './Footer';
import MainNavigation from './MainNavigation';

type IProps = {
  children: JSX.Element;
};
const Layout: FC<IProps> = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
      <FloatingActionButton />
      <Footer />
    </Fragment>
  );
};

export default Layout;
