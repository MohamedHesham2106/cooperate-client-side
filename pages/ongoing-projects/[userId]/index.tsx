import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

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
    <Container className='md:w-11/12 p-5 w-full mx-auto my-24 flex flex-col border shadow-md items-center rounded-md justify-center gap-10'>
      <h1 className='text-3xl font-bold bg-blue-500 w-full text-center p-5 text-white rounded-xl'>
        OnGoing Projects
      </h1>
      <ProjectList projects={projects} user={user} />
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
