import { FC, Fragment } from 'react';

import Proposal from './Proposal';
import AccordionList from '../UI/AccordionList';
interface IProps {
  proposals: IProposal['proposal'][];
  user: IUser;
}

const ProposalList: FC<IProps> = ({ proposals }) => {
  // Sort proposals based on their createdAt date in descending order
  proposals.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter proposals based on their proposal_status
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
              key={proposal._id}
              proposal={proposal}
            />
          ))}

          {declinedProposals.map((proposal: IProposal['proposal'], index) => (
            <Proposal
              offset={`0.${index + 4}`}
              key={proposal._id}
              proposal={proposal}
            />
          ))}
        </Fragment>
      </AccordionList>
    </div>
  );
};

export default ProposalList;
