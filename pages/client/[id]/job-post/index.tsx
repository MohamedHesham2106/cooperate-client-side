import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';

import JobForm from '../../../../components/Forms/Job Forms/JobForm';
import Container from '../../../../components/UI/Container';
import { getPayloadFromToken } from '../../../../utils/cookie';
import { getUserData } from '../../../../utils/user';
interface IProps {
  user: IUser;
}
const JobPost: NextPage<IProps> = ({ user }) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE Job Posting | Post Your Job and Get Matched with Top
          Freelancers
        </title>
        <meta
          name='description'
          content='COO/RATE Job Posting allows you to post your job and get matched with top freelancers. Describe your project and requirements, set a budget, and receive proposals from qualified freelancers. Sign up for free today!'
        />
        <meta
          name='keywords'
          content='COO/RATE Job Posting, post a job, job description, job requirements, budget, proposals, freelancers'
        />
      </Head>

      <Container className='md:w-9/12 w-11/12 mx-auto my-24 p-5 '>
        <JobForm user={user} />
      </Container>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as ParsedUrlQuery;
  const userId = id?.toString().replace('~', '');
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const user = await getUserData(userId, jwt_access);
    const payload = getPayloadFromToken(jwt_refresh);
    if (payload.sub === user._id && user.role === 'client') {
      return {
        props: {
          user,
        },
      };
    }
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default JobPost;
