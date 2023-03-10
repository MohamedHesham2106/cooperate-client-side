import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

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
    <Container className='md:w-10/12 w-11/12 mx-auto my-24 border border-gray-300 rounded shadow-lg'>
      <ProposalForm userId={userId} job={job} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as ParsedUrlQuery;
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const jobId = id?.toString().replace('~', '');
    const job = (await axiosInstance.get(`/api/job/${jobId}`)).data;
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
