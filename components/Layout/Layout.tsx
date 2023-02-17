import { Fragment } from 'react';

import Footer from './Footer';
import MainNavigation from './MainNavigation';

type Props = {
  children: JSX.Element;
};
const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
