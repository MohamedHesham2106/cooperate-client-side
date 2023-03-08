import { FC, MouseEvent } from 'react';

import BioModal from './BioModal';
import LanguageModal from './LanguageModal';
import ProfilePictureModal from './ProfilePictureModal';
import JobDetails from '../../Jobs/JobDetails';

interface IModalManager {
  Type?: string;
  user: IUser;
  jobId?: string;
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
}) => {
  console.log(Type);
  if (Type === 'language') {
    return <LanguageModal onClose={onClose} user={user._id} />;
  }
  if (Type === 'bio') {
    return (
      <BioModal onClose={onClose} userId={user?._id} bio={user.biography} />
    );
  }
  if (Type === 'profile') {
    return <ProfilePictureModal onClose={onClose} userId={user._id} />;
  }
  if (Type === 'job') {
    return (
      <JobDetails
        onClose={onClose}
        jobId={jobId}
        isSameRole={isSameRole}
        isOwnProfile={isOwnProfile}
        isFreelancer={isFreelancer}
      />
    );
  }
  return null;
};

export default ModalManager;
