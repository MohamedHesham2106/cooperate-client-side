import { FC, Fragment } from 'react';

import Invitation from './Invitation';
import AccordionList from '../UI/AccordionList';
interface IProps {
  invitations: IInvitation['invitation'][];
  user: IUser;
}

const InvitationList: FC<IProps> = ({ invitations }) => {
  invitations?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className='flex flex-col'>
      <AccordionList title='Invitations'>
        <Fragment>
          {invitations?.map((invitation: IInvitation['invitation'], index) => (
            <Invitation
              offset={`0.${index}`}
              key={invitation._id}
              invitation={invitation}
            />
          ))}
        </Fragment>
      </AccordionList>
    </div>
  );
};

export default InvitationList;
