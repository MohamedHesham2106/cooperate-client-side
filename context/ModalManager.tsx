import { createContext, FC, useContext, useMemo, useState } from 'react';

import EditUser from '../components/Admin/User Management/EditUser';
import ViewUser from '../components/Admin/User Management/ViewUser';
import BioModal from '../components/Forms/Modal Forms/BioModal';
import LanguageModal from '../components/Forms/Modal Forms/LanguageModal';
import ProfilePictureModal from '../components/Forms/Modal Forms/ProfilePictureModal';
import InvitationDetails from '../components/Invitation/InvitationDetails';
import JobDetails from '../components/Jobs/JobDetails';
import WorkHistoryDetails from '../components/Profile/Sections/WorkHistory/WorkHistoryDetails';
import ProjectDetails from '../components/Project/ProjectDetails';
import ProposalDetails from '../components/Proposal/ProposalDetails';

// Interface for Context value of ModalManagerContext
interface IModalManagerContext {
  displayModal: (type: string, props?: any) => void;
}

// Create a context for managing modals
export const ModalManagerContext = createContext<IModalManagerContext>(
  {} as IModalManagerContext
);

// Interface for the Props of ModalManagerProvider
interface IModalManagerProvider {
  children: React.ReactNode;
}

// Component for providing the modal manager context
export const ModalManagerProvider: FC<IModalManagerProvider> = ({
  children,
}) => {
  // State for the type of modal being displayed
  const [modalType, setModalType] = useState<string | null>(null);
  // State for the props of the modal being displayed
  const [modalProps, setModalProps] = useState<any>({});

  // Function to display a modal
  const displayModal = (type: string, props?: any) => {
    setModalType(type);
    setModalProps(props || {});
  };

  // Function to close the modal
  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  // Function to render the appropriate modal Component based on modalType
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
      case 'history':
        return (
          <WorkHistoryDetails
            onClose={closeModal}
            workHistory={modalProps.project}
          />
        );
      default:
        return null;
    }
  };
  // Create the value for the ModalManagerContext
  const value = useMemo(
    () => ({
      displayModal,
    }),
    []
  ) as IModalManagerContext;

  // Render the ModalManagerProvider with the provided children and modal component
  return (
    <ModalManagerContext.Provider value={value}>
      {children}
      {renderModal()}
    </ModalManagerContext.Provider>
  );
};

// Custom Hook to use the Modals
export const useModalManager = () => useContext(ModalManagerContext);
