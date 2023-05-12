import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react';

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
    <Fragment>
      <Head>
        <title>
          COO/RATE | View Proposals for Freelance Jobs - Hire the Best Talent
          Today
        </title>
        <meta
          name='description'
          content='View proposals from top freelancers on COO/RATE for your projects. Choose the best talent for the job and start your project today. Access a pool of skilled professionals and find the perfect match for your needs.'
        />
        <meta
          name='keywords'
          content='COO/RATE, freelance, view proposals, jobs, projects, talent'
        />
      </Head>

      <Container className='w-full px-5 my-24   rounded-sm  '>
        <ProposalList proposals={proposals} user={user} />
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
    const proposals = (await axiosInstance.get(`/api/proposal/${user._id}`))
      .data;
    const payload = getPayloadFromToken(jwt_refresh);
    if (payload && payload.sub === user._id && user.role === 'client') {
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
