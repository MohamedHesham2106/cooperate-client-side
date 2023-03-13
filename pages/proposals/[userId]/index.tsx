import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import ProposalList from '../../../components/Proposal/ProposalList';
import Container from '../../../components/UI/Container';
import axiosInstance from '../../../utils/axios';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';
interface IProps {
  proposals: IProposal['proposal'][];
  user: IUser;
}

const ViewProposal: NextPage<IProps> = ({ proposals, user }) => {
  return (
    <Container className='md:w-10/12 w-11/12 mx-auto my-24 border border-t-0 shadow-lg  rounded-sm  '>
      <ProposalList proposals={proposals} user={user} />
    </Container>
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
    const proposals = (await axiosInstance.get(`/api/proposal/${user._id}`))
      .data;
    const payload = getPayloadFromToken(jwt_refresh);
    if (payload.sub === user._id && user.role === 'client') {
      return {
        props: {
          user,
          proposals,
        },
      };
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default ViewProposal;
