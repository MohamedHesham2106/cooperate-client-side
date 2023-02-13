
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';

import Register from '../../components/Forms/Register';
import UserType from '../../components/Forms/UserType';

const SignUp: NextPage = () => {
  const [role, setRole] = useState<string>('');

  const userType = (UserType: string): void => {
    setRole(UserType);
    // console.log(type);
  };
  return (
    <Fragment>
      {!role && <UserType roleFetch={userType} />}
      {role && <Register role={role} />}
    </Fragment>
  );
};
export default SignUp;
