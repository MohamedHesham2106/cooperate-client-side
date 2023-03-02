import { FC, Fragment, MouseEvent } from 'react';

import BioModal from './BioModal';
import LanguageModal from './LanguageModal';
import Modal from '../UI/Modal';

interface IModalManager {
  Type?: string;
  user: IUser;
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
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
  if (Type === 'category') {
    return (
      <Modal onClose={onClose} className=''>
        category
      </Modal>
    );
  }
  if (Type === 'education') {
    return (
      <Modal onClose={onClose} className=''>
        Education
      </Modal>
    );
  }
  if (Type === 'projects') {
    return (
      <Modal onClose={onClose} className=''>
        projects
      </Modal>
    );
  }
  if (Type === 'skills') {
    return (
      <Modal onClose={onClose} className=''>
        Skills
      </Modal>
    );
  }
  return <Fragment></Fragment>;
};

export default ModalManager;
