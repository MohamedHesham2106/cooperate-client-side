import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, MouseEvent, ReactNode } from 'react';
import { BiMap } from 'react-icons/bi';
import { BsBuilding } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import Button from '../UI/Button';
import { useModalManager } from '../../context/ModalManager';
interface IProps {
  isOwnProfile: boolean;
  isSameRole: boolean;
  user: IUser;
  isFreelancer: 'freelancer' | 'client' | null;
}
interface IProfileButton {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: ReactNode;
}
const ProfileButton: FC<IProfileButton> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <div className='flex justify-between'>
      <Button
        onClick={onClick}
        className={`w-44 text-sm text-white text-center py-2 px-8 capitalize rounded bg-blue-500 hover:bg-blue-700 shadow hover:shadow-lg font-medium ${className}`}
      >
        {children}
      </Button>
    </div>
  );
};

const Profile: FC<IProps> = ({
  isOwnProfile,
  user,
  isSameRole,
  isFreelancer,
}) => {
  // Destructure properties from the 'user' object
  const {
    first_name,
    last_name,
    country,
    address,
    categories,
    company_name,
    isIDVerified,
  } = user;

  // Determine the style for the name container based on whether it is the user's own profile or not
  const nameStyle = !isOwnProfile
    ? 'flex flex-col gap-3 md:w-full md:pl-6'
    : 'flex flex-col gap-3 md:w-full';

  // Handle inviting the user
  const handleInvite = () => {
    // Invitation logic
    router.push(`/invitation/~${user._id}`);
  };

  // Get the router instance
  const router = useRouter();

  // Get the displayModal function from the useModalManager hook
  const { displayModal } = useModalManager();

  // Handle opening the profile modal
  const handleModal = () => {
    displayModal('profile', {
      userId: user._id,
    });
  };

  return (
    <div className='p-6 bg-white dark:bg-gray-800 rounded-t-md '>
      <div
        className={`flex flex-col md:flex-row items-center ${
          !isOwnProfile ? 'justify-between gap-6 md:gap-0' : 'gap-6'
        }  `}
      >
        <div>
          <div className='h-32 w-32 mb-4 lg:mb-0 mr-4 bg-indigo-100 ring-offset-base-100 ring-offset-4 ring ring-blue-500  rounded-full shadow-2xl  inset-x-0   flex items-center justify-center text-indigo-500'>
            {!user.imageUrl ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-full w-full rounded-full overflow-hidden shadow'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <Image
                height={128}
                width={128}
                alt='profile'
                className='h-full w-full rounded-full overflow-hidden shadow'
                src={user.imageUrl}
              />
            )}

            {isOwnProfile && (
              <button
                onClick={handleModal}
                data-modal-type='profile'
                className='h-32 w-32 rounded-full overflow-hidden shadow group  hover:bg-gray-200 opacity-70  absolute flex justify-center items-center cursor-pointer transition duration-500'
              >
                <Image
                  className='hidden group-hover:block w-10'
                  src='https://www.svgrepo.com/show/33565/upload.svg'
                  alt=''
                  width={128}
                  height={128}
                />
              </button>
            )}
          </div>
        </div>
        <div className={nameStyle}>
          <div className='capitalize text-2xl md:text-start text-center font-normal flex items-center justify-start gap-3 '>
            {first_name} {last_name?.charAt(0)}.{' '}
            {isIDVerified && (
              <GoVerified
                size={18}
                className='text-blue-500'
                title='Identity Verified'
              />
            )}
          </div>
          <div className='flex gap-2 justify-center md:justify-start'>
            {company_name && <BsBuilding />}
            {categories || company_name ? (
              <div className='capitalize text-sm font-semibold flex items-center justify-center md:justify-start'>
                <span
                  title={
                    ((categories && categories[0]?.name) ||
                      company_name) as string
                  }
                  className='text-blue-500'
                >
                  {
                    ((categories && categories[0]?.name) ||
                      company_name) as string
                  }
                </span>
              </div>
            ) : null}
          </div>

          <div className='capitalize text-xs font-normal flex md:gap-1 items-center justify-center md:justify-start'>
            <BiMap size={15} color='#fa923d' />
            <span>
              {address ? address + ',' : ''}
              {country}
            </span>
          </div>
          <div className='flex items-center justify-center md:justify-start last:'>
            {/* <Rating /> */}
          </div>
        </div>
        {!isOwnProfile && !isSameRole && isFreelancer === 'client' && (
          <ProfileButton onClick={handleInvite}>Invite</ProfileButton>
        )}
        {isOwnProfile && isSameRole && isFreelancer === 'client' && (
          <ProfileButton
            onClick={() => router.push(`/${user.role}/~${user._id}/job-post`)}
          >
            Post a job
          </ProfileButton>
        )}
        {isOwnProfile && isSameRole && (
          <ProfileButton
            className='text-lg'
            onClick={() => router.push(`/${user.role}/~${user._id}/settings`)}
          >
            Profile Settings
          </ProfileButton>
        )}
      </div>
    </div>
  );
};

export default Profile;
