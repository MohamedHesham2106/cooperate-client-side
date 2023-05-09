import Link from 'next/link';
import { FC, Fragment, MouseEvent, useEffect, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';

import Modal from '../UI/Modal';
import { getTimeDifference } from '../../utils/date';
interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  invitation?: IInvitation['invitation'];
}
const InvitationDetails: FC<IProps> = ({ invitation, onClose }) => {
  const [createdAt, setCreatedAt] = useState<string | undefined>();
  useEffect(() => {
    if (invitation) {
      setCreatedAt(
        getTimeDifference(new Date(invitation?.createdAt).getTime())
      );
    }
  }, [invitation, invitation?.createdAt]);

  return (
    <Fragment>
      {invitation && (
        <Modal
          className='p-2 flex flex-col gap-5 relative'
          onClose={onClose}
          Side
        >
          <section className='flex flex-col'>
            <div className='flex items-center gap-5'>
              <h1 className='font-normal text-base'>
                You've been invited to send proposal for{' '}
                {invitation?.job_id.title} Job
              </h1>
              <Link
                href={`/client/~${invitation.client_id._id}`}
                className='bg-blue-500 w-32 text-xs rounded-md p-2 flex items-center justify-center text-white  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset'
              >
                View Client Profile
              </Link>
            </div>
            <time className='text-sm text-gray-400'>{createdAt}</time>
          </section>
          <section className='flex flex-col  justify-between min-h-[80vh]'>
            <div className='flex flex-col gap-4'>
              <h3 className='font-medium text-xl flex gap-1 mb-2 items-center '>
                <SlEnvolopeLetter size={20} />
                Invitation Content:
              </h3>
              <p className='whitespace-pre-wrap'>
                {invitation.invitation_letter}
              </p>
            </div>
            <div className=''>
              <Link
                href={`/proposals/job/~${invitation.job_id._id}`}
                className='bg-blue-500 w-full text-sm rounded-md py-3 px-2 flex items-center justify-center text-white  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset'
              >
                Send a Proposal
              </Link>
            </div>
          </section>
        </Modal>
      )}
    </Fragment>
  );
};

export default InvitationDetails;
