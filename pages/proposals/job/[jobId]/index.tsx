import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react';

import ProposalForm from '../../../../components/Proposal/ProposalForm';
import Container from '../../../../components/UI/Container';
import axiosInstance from '../../../../utils/axios';
import { getPayloadFromToken } from '../../../../utils/cookie';
import { getUserData } from '../../../../utils/user';

interface IProps {
  userId: IUser['_id'];
  job: IJobs;
}

const Proposal: NextPage<IProps> = ({ userId, job }) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE | Submit Proposals for Freelance Jobs - Hire Top Talent Today
        </title>
        <meta
          name='description'
          content='Find the best freelancers for your projects on COO/RATE. Submit proposals for jobs and hire top talent in your field. Get access to a pool of skilled professionals and start your project today.'
        />
        <meta
          name='keywords'
          content='COO/RATE, freelance, proposals, jobs, projects, talent'
        />
      </Head>
      <Container className='md:w-10/12 w-11/12 mx-auto my-24 border border-gray-300 rounded shadow-lg'>
        <ProposalForm userId={userId} job={job} />
      </Container>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { jobId } = params as ParsedUrlQuery;
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const job_id = jobId?.toString().replace('~', '');
    const job = (await axiosInstance.get(`/api/job/${job_id}`)).data;
    const payload = getPayloadFromToken(jwt_refresh);
    const user = await getUserData(payload.sub, jwt_access);
    if (payload.sub === user._id && user.role === 'freelancer') {
      return {
        props: {
          userId: user._id,
          job: job.job,
        },
      };
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Proposal;
