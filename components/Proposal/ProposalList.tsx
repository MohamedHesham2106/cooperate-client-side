import { FC, MouseEvent, useState } from 'react';
import { VscTriangleUp } from 'react-icons/vsc';

import Proposal from './Proposal';
import ModalManager from '../Forms/Modal Forms/ModalManager';
interface IProps {
  proposals: IProposal['proposal'][];
  user: IUser;
}

const ProposalList: FC<IProps> = ({ proposals, user }) => {
  const [selectedProposal, setSelectedProposal] = useState<
    IProposal['proposal'] | undefined
  >();
  const [showPendingList, setShowPendingList] = useState<boolean>(true);
  const [showHistoryList, setShowHistoryList] = useState<boolean>(false);
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
    <div className={`flex flex-col ${showPendingList ? 'gap-10' : 'gap-1'}`}>
      <div>
        <div
          onClick={() => setShowPendingList(!showPendingList)}
          className='text-3xl font-medium text-center p-2 text-white rounded-sm shadow-md bg-blue-500 cursor-pointer flex items-center'
        >
          <div className='w-[96%] text-center ml-16'>Pending Proposals</div>
          {showPendingList ? (
            <VscTriangleUp className='justify-self-end w-[4%] transition-all ease-in-out' />
          ) : (
            <VscTriangleUp className='justify-self-end w-[4%] transition-all ease-in-out rotate-180' />
          )}
        </div>
        {showPendingList && pendingProposals.length !== 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 px-2 pt-2'>
            {pendingProposals.map((proposal: IProposal['proposal']) => (
              <Proposal
                ModalHandler={showModalHandler}
                onClick={handleProposalClick}
                key={proposal._id}
                proposal={proposal}
              />
            ))}
          </div>
        ) : (
          showPendingList && (
            <p className='text-md text-center p-2 text-xl font-semibold'>-</p>
          )
        )}
      </div>
      <div className='flex flex-col'>
        <div
          onClick={() => setShowHistoryList(!showHistoryList)}
          className='text-3xl font-medium text-center p-2 text-white  rounded-sm  shadow-md   bg-blue-500 cursor-pointer flex items-center'
        >
          <div className='w-[96%] text-center ml-16'>History</div>
          {showHistoryList ? (
            <VscTriangleUp className='justify-self-end w-[4%] transition-all ease-in-out' />
          ) : (
            <VscTriangleUp className='justify-self-end w-[4%] transition-all ease-in-out rotate-180' />
          )}
        </div>
        {showHistoryList && (
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2  px-2 py-2'>
              {acceptedProposals.map((proposal: IProposal['proposal']) => (
                <Proposal
                  ModalHandler={showModalHandler}
                  onClick={handleProposalClick}
                  key={proposal._id}
                  proposal={proposal}
                />
              ))}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2  px-2 py-2'>
              {declinedProposals.map((proposal: IProposal['proposal']) => (
                <Proposal
                  ModalHandler={showModalHandler}
                  onClick={handleProposalClick}
                  key={proposal._id}
                  proposal={proposal}
                />
              ))}
            </div>
          </div>
        )}
      </div>
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
