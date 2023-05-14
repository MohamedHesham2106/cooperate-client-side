import { motion } from 'framer-motion';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';

import { useModalManager } from '../../context/ModalManager';
import { getTimeDifference } from '../../utils/date';
import { fadeIn } from '../../utils/variants';

interface IProps {
  proposal: IProposal['proposal'];

  offset: string;
}
const Proposal: FC<IProps> = ({ proposal, offset }) => {
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  // Define animation variants using the 'fadeIn' effect with a specific offset
  const variants = useMemo(() => fadeIn('right', Number(offset)), [offset]);

  // Update the 'createdAt' state when the 'proposal' prop changes
  useEffect(() => {
    // Calculate the time difference and set it as the creation time
    setCreatedAt(getTimeDifference(new Date(proposal.createdAt).getTime()));
  }, [proposal.createdAt]);

  const { displayModal } = useModalManager();

  // Function to handle showing the proposal modal
  const showModalHandler = () => {
    displayModal('proposal', {
      proposal,
    });
  };
  return (
    <Fragment>
      {proposal && (
        <motion.div
          variants={variants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.5 }}
          className='flex items-center p-4 bg-white hover:bg-blue-50  rounded-sm  shadow-md border cursor-pointer relative dark:bg-gray-700 dark:border-gray-700 dark:shadow-gray-900'
          onClick={showModalHandler}
        >
          <span className='text-xs font-bold uppercase px-2 mt-2 mr-2 text-blue-700 bg-blue-200 border rounded-full absolute top-0 right-0 dark:border-none shadow'>
            {proposal.job_id?.title}
          </span>
          <span className='text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0'>
            {createdAt}
          </span>

          <div className='ml-2'>
            <h4 className='text-lg font-semibold leading-tight text-gray-900 flex items-center gap-2 dark:text-white'>
              <SlEnvolopeLetter className='dark:text-blue-500' />{' '}
              {proposal.freelancer_id.first_name}{' '}
              {proposal.freelancer_id.last_name}
            </h4>
            <p className='text-sm text-gray-600 dark:text-white'>
              sent you a proposal!
            </p>
          </div>
        </motion.div>
      )}
    </Fragment>
  );
};

export default Proposal;
