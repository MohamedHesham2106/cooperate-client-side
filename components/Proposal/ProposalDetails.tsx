import Link from 'next/link';
import { FC, Fragment, MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLink } from 'react-icons/ai';
import { SlEnvolopeLetter } from 'react-icons/sl';

import Button from '../UI/Button';
import Modal from '../UI/Modal';
import axiosInstance from '../../utils/axios';
import { getTimeDifference } from '../../utils/date';
interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  proposal?: IProposal['proposal'];
}
const ProposalDetails: FC<IProps> = ({ proposal, onClose }) => {
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  // Log the 'proposal' object for debugging purposes
  console.log(proposal);

  // Update the 'createdAt' state when the 'proposal' or 'proposal.createdAt' prop changes
  useEffect(() => {
    if (proposal) {
      // Calculate the time difference and set it as the creation time
      setCreatedAt(getTimeDifference(new Date(proposal?.createdAt).getTime()));
    }
  }, [proposal, proposal?.createdAt]);

  // Function to handle accepting the proposal
  const acceptClickHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (proposal?._id) {
      // Send a POST request to accept the proposal
      await axiosInstance
        .post('/api/project', {
          proposal_id: proposal?._id,
        })
        .then(() => {
          toast.success('Proposal Accepted!', {
            style: {
              border: '1px solid #07bd3a',
              padding: '16px',
            },
          });
        })
        .catch((error) => {
          const err = error as IError;
          const { message } = err.response.data;
          toast.error(message, {
            style: {
              border: '1px solid #ce1500',
              padding: '16px',
            },
          });
        });
    }
  };

  // Function to handle declining the proposal
  const declineClickHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // Send a PUT request to decline the proposal
    await axiosInstance
      .put('/api/proposal')
      .then(() => {
        toast.success('Proposal Declined!', {
          style: {
            border: '1px solid #07bd3a',
            padding: '16px',
          },
        });
      })
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        toast.error(message, {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      });
  };
  return (
    <Fragment>
      {proposal && (
        <Modal
          className='p-2 flex flex-col gap-5 relative'
          onClose={onClose}
          Side
        >
          <section className='flex flex-col'>
            <div className='flex items-center gap-5 relative'>
              <h1 className='font-normal text-xl '>
                Proposal for {proposal?.job_id.title} Job
              </h1>
              <Link
                href={`/freelancer/~${proposal.freelancer_id._id}`}
                className='bg-blue-500 w-44 text-xs rounded-md p-2 flex items-center justify-center text-white  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset'
              >
                View Freelancer Profile
              </Link>
            </div>
            <time className='text-sm text-gray-400'>{createdAt}</time>
          </section>
          <section className='flex flex-col min-h-[80vh] justify-between'>
            <div className='flex flex-col'>
              <h3 className='font-medium text-2xl flex gap-1 mb-2 items-center '>
                <SlEnvolopeLetter size={20} />
                Cover Letter:
              </h3>
              <p className='whitespace-pre-wrap'>{proposal.cover_letter}</p>
              {proposal.website_link && (
                <section className='flex flex-col'>
                  <h4 className='font-semibold text-lg flex gap-1 mb-2 items-center'>
                    <AiOutlineLink size={17} /> GitHub Link
                  </h4>
                  <a
                    href={proposal.website_link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {proposal.website_link}
                  </a>
                </section>
              )}
            </div>

            {proposal.proposal_status === 'pending' && (
              <section className='flex items-center gap-2 justify-end'>
                <Button
                  type='button'
                  width='w-full'
                  onClick={acceptClickHandler}
                >
                  Accept
                </Button>
                <Button
                  type='button'
                  onClick={declineClickHandler}
                  className='w-full bg-white rounded-full text-base px-5 py-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
                >
                  Decline
                </Button>
              </section>
            )}
            {proposal.proposal_status === 'accepted' && (
              <section className='flex items-center gap-2 justify-end'>
                <span className='uppercase w-full bg-green-500 text-center rounded-md text-base px-5 py-2.5 text-white'>
                  Accepted
                </span>
              </section>
            )}
            {proposal.proposal_status === 'declined' && (
              <section className='flex items-center gap-2 justify-end'>
                <span className='uppercase w-full bg-red-500 text-center rounded-md text-base px-5 py-2.5 text-white'>
                  DECLINED
                </span>
              </section>
            )}
          </section>
        </Modal>
      )}
    </Fragment>
  );
};

export default ProposalDetails;
