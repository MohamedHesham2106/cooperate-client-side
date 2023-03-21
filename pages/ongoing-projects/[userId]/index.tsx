import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';

import ProjectList from '../../../components/Project/PorjectList';
import Container from '../../../components/UI/Container';
import axiosInstance from '../../../utils/axios';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';

interface IProps {
  user: IUser;
  projects?: IProject[];
}

const OngoingProjects: NextPage<IProps> = ({ user, projects }) => {
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE | Ongoing Projects - Manage Your Freelance Projects in One
          Place
        </title>
        <meta
          name='description'
          content='Find and manage all of your ongoing freelance projects in one place on COO/RATE. Keep track of project milestones, communicate with your team, and get the job done on time and on budget.'
        />
        <meta
          name='keywords'
          content='COO/RATE, freelance, ongoing projects, current projects, manage projects, milestones, communication'
        />
      </Head>
      <Container className='w-full p-5 my-24 flex flex-col  shadow-md items-center rounded-md justify-center gap-10'>
        <h1 className='text-5xl font-bold  w-full text-center p-5 text-white rounded-md from-blue-600 shadow-md to-blue-400 bg-gradient-to-r font-serif '>
          Current Projects
        </h1>
        <ProjectList projects={projects} user={user} />
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
    const projects = (await axiosInstance.get(`/api/project/${user._id}`)).data;
    const payload = getPayloadFromToken(jwt_refresh);
    if (user_id === payload.sub) {
      return {
        props: {
          user,
          projects: projects.projects,
        },
      };
    }
    return { redirect: { destination: '/404', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default OngoingProjects;
