import { createContext, FC, useContext, useMemo, useState } from 'react';

import EditUser from '../components/Admin/User Management/EditUser';
import ViewUser from '../components/Admin/User Management/ViewUser';
import BioModal from '../components/Forms/Modal Forms/BioModal';
import LanguageModal from '../components/Forms/Modal Forms/LanguageModal';
import ProfilePictureModal from '../components/Forms/Modal Forms/ProfilePictureModal';
import InvitationDetails from '../components/Invitation/InvitationDetails';
import JobDetails from '../components/Jobs/JobDetails';
import ProjectDetails from '../components/Project/ProjectDetails';
import ProposalDetails from '../components/Proposal/ProposalDetails';

interface IModalManagerContext {
  displayModal: (type: string, props?: any) => void;
}

export const ModalManagerContext = createContext<IModalManagerContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  displayModal: () => {},
});

interface IModalManagerProvider {
  children: React.ReactNode;
}

export const ModalManagerProvider: FC<IModalManagerProvider> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const displayModal = (type: string, props?: any) => {
    setModalType(type);
    setModalProps(props || {});
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const renderModal = () => {
    switch (modalType) {
      case 'language':
        return <LanguageModal onClose={closeModal} user={modalProps.userId} />;
      case 'bio':
        return (
          <BioModal
            onClose={closeModal}
            userId={modalProps.userId}
            bio={modalProps.bio}
          />
        );
      case 'profile':
        return (
          <ProfilePictureModal
            onClose={closeModal}
            userId={modalProps.userId}
          />
        );
      case 'job':
        return (
          <JobDetails
            onClose={closeModal}
            jobId={modalProps.jobId}
            isSameRole={modalProps.isSameRole}
            isOwnProfile={modalProps.isOwnProfile}
            isFreelancer={modalProps.isFreelancer}
          />
        );
      case 'proposal':
        return (
          <ProposalDetails
            onClose={closeModal}
            proposal={modalProps.proposal}
          />
        );
      case 'invitation':
        return (
          <InvitationDetails
            onClose={closeModal}
            invitation={modalProps.invitation}
          />
        );
      case 'project':
        return (
          <ProjectDetails onClose={closeModal} project={modalProps.project} />
        );
      case 'viewUser':
        return <ViewUser onClose={closeModal} user={modalProps.user} />;
      case 'modifyUser':
        return <EditUser onClose={closeModal} user={modalProps.user} />;
      default:
        return null;
    }
  };
  const value = useMemo(
    () => ({
      displayModal,
    }),
    []
  ) as IModalManagerContext;
  return (
    <ModalManagerContext.Provider value={value}>
      {children}
      {renderModal()}
    </ModalManagerContext.Provider>
  );
};

export const useModalManager = () => useContext(ModalManagerContext);
