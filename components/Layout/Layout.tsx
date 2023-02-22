import { FC, Fragment } from 'react';

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
      <Footer />
    </Fragment>
  );
};

export default Layout;
