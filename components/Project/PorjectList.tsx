import { FC, MouseEvent, useState } from 'react';

import Project from './Project';
import ModalManager from '../Forms/Modal Forms/ModalManager';
import Container from '../UI/Container';

interface IProps {
  projects?: IProject[];
  user?: IUser;
}

const ProjectList: FC<IProps> = ({ projects, user }) => {
  const [selectedProject, SetSelectedProject] = useState<
    IProject | undefined
  >();
  const [modalType, setModalType] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    const type = event.currentTarget.getAttribute('data-modal-type');
    setModalType(type ? type : undefined);
    setShowModal(true);
  };
  const hideModalHandler = () => {
    SetSelectedProject(undefined);
    setShowModal(false);
  };
  const handleJobClick = (project: IProject) => {
    SetSelectedProject(project);
  };
  const sortedProjects = projects?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Container className='flex flex-wrap w-full'>
      {sortedProjects &&
        sortedProjects.length > 0 &&
        sortedProjects.map((project: IProject) => (
          <Project
            key={project._id}
            project={project}
            onClick={handleJobClick}
            ModalHandler={showModalHandler}
          />
        ))}

      {showModal && (
        <ModalManager
          Type={modalType}
          user={user}
          project={selectedProject}
          onClose={hideModalHandler}
        />
      )}
    </Container>
  );
};

export default ProjectList;
