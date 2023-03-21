import PropTypes from 'prop-types';
import { FC, MouseEvent } from 'react';

import BioModal from './BioModal';
import LanguageModal from './LanguageModal';
import ProfilePictureModal from './ProfilePictureModal';
import InvitationDetails from '../../Invitation/InvitationDetails';
import JobDetails from '../../Jobs/JobDetails';
import ProjectDetails from '../../Project/ProjectDetails';
import ProposalDetails from '../../Proposal/ProposalDetails';

interface IModalManager {
  Type?: string;
  user?: IUser;
  jobId?: string;
  invitation?: IInvitation['invitation'];
  project?: IProject;
  proposal?: IProposal['proposal'];
  onClose: (
    event?: MouseEvent<HTMLDivElement | HTMLButtonElement | SVGAElement>
  ) => void;
  isSameRole?: boolean;
  isFreelancer?: 'freelancer' | 'client';
  isOwnProfile?: boolean;
}

const ModalManager: FC<IModalManager> = ({
  Type,
  onClose,
  user,
  jobId,
  isFreelancer,
  isOwnProfile,
  isSameRole,
  project,
  proposal,
  invitation,
}) => {
  switch (Type) {
    case 'language':
      return <LanguageModal onClose={onClose} user={user?._id} />;
    case 'bio':
      return (
        <BioModal onClose={onClose} userId={user?._id} bio={user?.biography} />
      );
    case 'profile':
      return <ProfilePictureModal onClose={onClose} userId={user?._id} />;
    case 'job':
      return (
        <JobDetails
          onClose={onClose}
          jobId={jobId}
          isSameRole={isSameRole}
          isOwnProfile={isOwnProfile}
          isFreelancer={isFreelancer}
        />
      );
    case 'proposal':
      return <ProposalDetails onClose={onClose} proposal={proposal} />;
    case 'invitation':
      return <InvitationDetails onClose={onClose} invitation={invitation} />;
    case 'project':
      return <ProjectDetails onClose={onClose} project={project} />;
    default:
      return null;
  }
};

ModalManager.propTypes = {
  Type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  jobId: PropTypes.string,
  isSameRole: PropTypes.bool,
  isFreelancer: PropTypes.oneOf(['freelancer', 'client']),
  isOwnProfile: PropTypes.bool,
};

export default ModalManager;
