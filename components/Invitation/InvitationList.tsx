import { FC, Fragment, MouseEvent, useState } from 'react';

import Invitation from './Invitation';
import ModalManager from '../Forms/Modal Forms/ModalManager';
import AccordionList from '../UI/AccordionList';
interface IProps {
  invitations: IInvitation['invitation'][];
  user: IUser;
}

const InvitationList: FC<IProps> = ({ invitations, user }) => {
  const [selectedInvitation, setSelectedInvitation] = useState<
    IInvitation['invitation'] | undefined
  >();
  invitations?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const [modalType, setModalType] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    const type = event.currentTarget.getAttribute('data-modal-type');
    setModalType(type ? type : undefined);
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setSelectedInvitation(undefined);
    setShowModal(false);
  };
  const handleInvitationClick = (invitation: IInvitation['invitation']) => {
    setSelectedInvitation(invitation);
  };

  return (
    <div className='flex flex-col'>
      <AccordionList title='Invitations'>
        <Fragment>
          {invitations?.map((invitation: IInvitation['invitation'], index) => (
            <Invitation
              offset={`0.${index}`}
              ModalHandler={showModalHandler}
              onClick={handleInvitationClick}
              key={invitation._id}
              invitation={invitation}
            />
          ))}
        </Fragment>
      </AccordionList>

      {showModal && (
        <ModalManager
          user={user}
          Type={modalType}
          invitation={selectedInvitation}
          onClose={hideModalHandler}
        />
      )}
    </div>
  );
};

export default InvitationList;
