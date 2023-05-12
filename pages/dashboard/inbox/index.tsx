import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import useSWR from 'swr';

import DashboardTitle from '../../../components/Admin/DashboardTitle';
import MessageAccordion from '../../../components/Admin/MessageAccordion';
import Container from '../../../components/UI/Container';
import { fetcher } from '../../../utils/axios';
import { getPayloadFromToken } from '../../../utils/cookie';
interface IProps {
  adminMessages?: IAdminMessage[];
}
const Inbox: NextPage<IProps> = () => {
  const { data: adminMessages } = useSWR('/api/message', fetcher, {
    refreshInterval: 1000,
  });
  const [latestAdminMessages, setLatestAdminMessages] = useState<
    IAdminMessage[]
  >([]);

  const handleNewData = (newData: IAdminMessage[]) => {
    setLatestAdminMessages(newData);
  };

  React.useEffect(() => {
    if (adminMessages) {
      handleNewData(adminMessages.messages);
    }
  }, [adminMessages]);

  return (
    <Container className='p-5 w-full grid grid-cols-1 gap-16'>
      <DashboardTitle
        pageName='Admin Message'
        url='Dashboard'
        title='Admin Message'
      />
      {adminMessages && (
        <MessageAccordion
          adminMessages={
            latestAdminMessages.length > 0
              ? latestAdminMessages
              : adminMessages.messages
          }
        />
      )}
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;
  try {
    const role = getPayloadFromToken(jwt_refresh)?.role;

    if (role !== 'admin') {
      return { redirect: { destination: '/404', permanent: false } };
    }
    return {
      props: {},
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Inbox;
