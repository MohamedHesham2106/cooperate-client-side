import { FC, Fragment, MouseEvent, useState } from 'react';

import Proposal from './Proposal';
import ModalManager from '../Forms/Modal Forms/ModalManager';
import AccordionList from '../UI/AccordionList';
interface IProps {
  proposals: IProposal['proposal'][];
  user: IUser;
}

const ProposalList: FC<IProps> = ({ proposals, user }) => {
  const [selectedProposal, setSelectedProposal] = useState<
    IProposal['proposal'] | undefined
  >();
  proposals.sort(
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
    setSelectedProposal(undefined);
    setShowModal(false);
  };
  const handleProposalClick = (proposal: IProposal['proposal']) => {
    setSelectedProposal(proposal);
  };
  const pendingProposals = proposals.filter(
    (prop: IProposal['proposal']) => prop.proposal_status === 'pending'
  );
  const acceptedProposals = proposals.filter(
    (prop: IProposal['proposal']) => prop.proposal_status === 'accepted'
  );
  const declinedProposals = proposals.filter(
    (prop: IProposal['proposal']) => prop.proposal_status === 'declined'
  );

  return (
    <div className='flex flex-col'>
      <AccordionList title='Pending Proposals'>
        <Fragment>
          {pendingProposals.map((proposal: IProposal['proposal'], index) => (
            <Proposal
              offset={`0.${index}`}
              ModalHandler={showModalHandler}
              onClick={handleProposalClick}
              key={proposal._id}
              proposal={proposal}
            />
          ))}
        </Fragment>
      </AccordionList>
      <AccordionList title='History'>
        <Fragment>
          {acceptedProposals.map((proposal: IProposal['proposal'], index) => (
            <Proposal
              offset={`0.${index + 4}`}
              ModalHandler={showModalHandler}
              onClick={handleProposalClick}
              key={proposal._id}
              proposal={proposal}
            />
          ))}

          {declinedProposals.map((proposal: IProposal['proposal'], index) => (
            <Proposal
              offset={`0.${index + 4}`}
              ModalHandler={showModalHandler}
              onClick={handleProposalClick}
              key={proposal._id}
              proposal={proposal}
            />
          ))}
        </Fragment>
      </AccordionList>
      {showModal && (
        <ModalManager
          user={user}
          Type={modalType}
          proposal={selectedProposal}
          onClose={hideModalHandler}
        />
      )}
    </div>
  );
};

export default ProposalList;
