import { motion } from 'framer-motion';
import { FC, Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';
import useSWR from 'swr';

import { ModalManagerContext } from '../../context/ModalManager';
import axiosInstance from '../../utils/axios';
import { getCookie } from '../../utils/cookie';
import { getTimeDifference } from '../../utils/date';
import { fadeIn } from '../../utils/variants';

interface IProps {
  proposal: IProposal['proposal'];

  offset: string;
}
const Proposal: FC<IProps> = ({ proposal, offset }) => {
  const [createdAt, setCreatedAt] = useState<string | undefined>();
  const variants = useMemo(() => fadeIn('right', Number(offset)), [offset]);
  useEffect(() => {
    setCreatedAt(getTimeDifference(new Date(proposal.createdAt).getTime()));
  }, [proposal.createdAt]);

  const { displayModal } = useContext(ModalManagerContext);
  const showModalHandler = () => {
    displayModal('proposal', {
      proposal,
    });
  };
  const fetcher = (url: string) =>
    axiosInstance
      .get(url, {
        headers: { Authorization: `Bearer ${getCookie('jwt_access')}` },
      })
      .then((res) => res.data);

  const { data, isLoading } = useSWR(
    `/api/user/${proposal.freelancer_id}`,
    fetcher
  );
  return (
    <Fragment>
      {data && !isLoading && (
        <motion.div
          variants={variants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.5 }}
          className='flex items-center p-4 bg-white hover:bg-blue-50  rounded-sm  shadow-md border cursor-pointer relative'
          onClick={showModalHandler}
        >
          <span className='text-xs font-bold uppercase px-2 mt-2 mr-2 text-blue-900 bg-blue-200 border rounded-full absolute top-0 right-0'>
            {proposal.job_id?.title}
          </span>
          <span className='text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0'>
            {createdAt}
          </span>

          <div className='ml-2'>
            <h4 className='text-lg font-semibold leading-tight text-gray-900 flex items-center gap-2'>
              <SlEnvolopeLetter /> {data.user.first_name} {data.user.last_name}
            </h4>
            <p className='text-sm text-gray-600'>sent you a proposal!</p>
          </div>
        </motion.div>
      )}
    </Fragment>
  );
};

export default Proposal;
