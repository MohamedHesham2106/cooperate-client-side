import React, { MouseEvent } from 'react';

import ClientDetails from '../../Profile/ClientDetails';
import FreelancerDetails from '../../Profile/FreelancerDetails';
import Profile from '../../Profile/Profile';
import Container from '../../UI/Container';
import Modal from '../../UI/Modal';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  user: IUser;
}
const ViewUser: React.FC<IProps> = ({ user, onClose }) => {
  return (
    <Modal className='' onClose={onClose} fullScreen>
     <Container className='md:w-9/12 w-11/12 mx-auto my-24 border border-gray-300 dark:border-none dark:bg-gray-800 rounded-md shadow-lg'>
        <Profile
          isOwnProfile={true}
          isSameRole={false}
          isFreelancer={undefined}
          user={user}
        />
        {user.role === 'freelancer' ? (
          <FreelancerDetails isOwnProfile={false} user={user} />
        ) : (
          <ClientDetails
            isOwnProfile={true}
            isSameRole={false}
            isFreelancer={undefined}
            user={user}
          />
        )}
      </Container>
    </Modal>
  );
};

export default ViewUser;
