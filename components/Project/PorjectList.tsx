import { FC } from 'react';

import Project from './Project';
import Container from '../UI/Container';

interface IProps {
  projects?: IProject[];
  user?: IUser;
}

const ProjectList: FC<IProps> = ({ projects }) => {
  const sortedProjects = projects?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Container className='flex flex-wrap w-full'>
      {sortedProjects &&
        sortedProjects.length > 0 &&
        sortedProjects.map((project: IProject) => (
          <Project key={project._id} project={project} />
        ))}
    </Container>
  );
};

export default ProjectList;
