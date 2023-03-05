import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MouseEvent, useState } from 'react';

import ModalManager from '../../../components/Forms/Modal Forms/ModalManager';
import ClientDetails from '../../../components/Profile/ClientDetails';
import Profile from '../../../components/Profile/Profile';
import Container from '../../../components/UI/Container';
import { getPayloadFromToken } from '../../../utils/cookie';
import { getUserData } from '../../../utils/user';
interface IProps {
  user: IUser;
  isOwnProfile: boolean;
  isSameRole: boolean;
  isFreelancer: 'freelancer' | 'client';
}
const Client: NextPage<IProps> = ({
  isOwnProfile,
  user,
  isSameRole,
  isFreelancer,
}) => {
  const [modalType, setModalType] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = (
    event: MouseEvent<SVGAElement | HTMLDivElement | HTMLButtonElement>
  ) => {
    const type = event.currentTarget.getAttribute('data-modal-type');
    setModalType(type ? type : undefined);
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Container className='md:w-9/12 w-11/12 mx-auto my-24 border border-gray-300 rounded-md shadow-lg'>
      {showModal && (
        <ModalManager Type={modalType} onClose={hideModalHandler} user={user} />
      )}
      <Profile
        isOwnProfile={isOwnProfile}
        isSameRole={isSameRole}
        isFreelancer={isFreelancer}
        user={user}
        ModalHandler={showModalHandler}
      />
      <ClientDetails isOwnProfile={isOwnProfile} user={user} />
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as ParsedUrlQuery;
  const userId = id?.toString().replace('~', '');
  const { jwt_refresh, jwt_access } = req.cookies;

  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const user = await getUserData(userId, jwt_access);
    const payload = getPayloadFromToken(jwt_refresh);

    return {
      props: {
        user,
        isOwnProfile: payload.sub === user._id,
        isSameRole: payload.role === user.role,
        isFreelancer: payload.role === 'freelancer' ? 'freelancer' : 'client',
      },
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};

export default Client;
