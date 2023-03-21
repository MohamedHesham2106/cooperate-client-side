import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react';

import InvitationList from '../../../components/Invitation/InvitationList';
import Container from '../../../components/UI/Container';
import axiosInstance from '../../../utils/axios';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';
interface IProps {
  invitations: IInvitation['invitation'][];
  user: IUser;
}

const ViewInvitations: NextPage<IProps> = ({ invitations, user }) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE | Invitation to Freelancers - Join Our Community Today
        </title>
        <meta
          name='description'
          content="Join COO/RATE's freelance community today and start working on high-quality projects with top clients in your field. Get invited to join and enjoy the benefits of being part of our exclusive network."
        />
        <meta
          name='keywords'
          content='COO/RATE, freelance, invitation, community, projects, clients'
        />
      </Head>
      <Container className='md:w-10/12 min-h-[90vh] w-11/12 mx-auto my-24    rounded-sm  '>
        <InvitationList invitations={invitations} user={user} />
      </Container>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { userId } = params as ParsedUrlQuery;
  const user_id = userId?.toString().replace('~', '');
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const user = await getUserData(user_id, jwt_access);
    const invitations = (await axiosInstance.get(`/api/invitation/${user._id}`))
      .data;
    const payload = getPayloadFromToken(jwt_refresh);
    if (payload.sub === user._id && user.role === 'freelancer') {
      return {
        props: {
          user,
          invitations,
        },
      };
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default ViewInvitations;
