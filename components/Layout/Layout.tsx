import { FC, Fragment, useEffect, useState } from 'react';

import FloatingActionButton from './FloatingActionButton';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import Sidebar from './Sidebar';
import { getRole } from '../../utils/user';

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
      <FloatingActionButton />
      <Footer />
    </Fragment>
  );
};

type AdminLayoutProps = {
  children: React.ReactNode;
};
const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <Fragment>
      <div
        className={`grid ${
          isOpen ? 'grid-cols-[1fr_5fr]' : 'grid-cols-[0.5fr_11fr]'
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar isOpen={handleOpen} />
        <main>{children}</main>
      </div>
    </Fragment>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(getRole() === 'admin' ? true : false);
  }, []);

  return isAdmin ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
};

export default Layout;
