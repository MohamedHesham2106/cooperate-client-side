import { FC, MouseEvent } from 'react';

import BioModal from './BioModal';
import LanguageModal from './LanguageModal';
import ProfilePictureModal from './ProfilePictureModal';

interface IModalManager {
  Type?: string;
  user: IUser;
  onClose: (
    event?: MouseEvent<HTMLDivElement | HTMLButtonElement | SVGAElement>
  ) => void;
}

const ModalManager: FC<IModalManager> = ({ Type, onClose, user }) => {
  if (Type === 'language') {
    return <LanguageModal onClose={onClose} user={user._id} />;
  }
  if (Type === 'bio') {
    return (
      <BioModal onClose={onClose} userId={user._id} bio={user.biography} />
    );
  }
  if (Type === 'profile') {
    return <ProfilePictureModal onClose={onClose} userId={user._id} />;
  }
  return null;
};

export default ModalManager;
