import { FC, useEffect, useRef, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';

import Notify from '../UI/Notify';
import { useNotification } from '../../context/NotificationProvider';

const sortNotifications = (notifications: INotification[]) => {
  return notifications
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

const NotificationDropDown: FC = () => {
  const { notifications } = useNotification();

  const [showDropDown, setShowDropDown] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState<
    INotification[] | undefined
  >();

  useEffect(() => {
    if (notifications) {
      setVisibleNotifications(sortNotifications(notifications).slice(0, 3));
    }
  }, [notifications]);

  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleShowMore = (show: boolean) => {
    if (show) {
      // if currently showing 3 notifications, show all notifications
      setVisibleNotifications(sortNotifications(notifications));
    } else {
      // otherwise, show the first 3 notifications
      setVisibleNotifications(sortNotifications(notifications)?.slice(0, 3));
    }
  };
  return (
    <div className='relative' ref={menuRef}>
      <div
        className='p-1 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:shadow-outline'
        onClick={() => {
          setShowDropDown(!showDropDown);
          handleShowMore(false);
        }}
      >
        <HiOutlineBell size={30} />
      </div>
      <div
        className='top-10 md:right-9 right-0 absolute w-auto max-w-lg min-w-[400px]  flex flex-col bg-white shadow rounded-lg box-border'
        style={{
          opacity: !showDropDown ? '0' : '1',
          transition: '0.3s ease',
          visibility: !showDropDown ? 'hidden' : 'visible',
          transform: !showDropDown ? 'scale(0.9)' : 'scale(1)',
          transformOrigin: 'top right',
        }}
      >
        <div className='flex flex-col gap-2'>
          <div className='bg-blue-400  p-2 rounded-t-lg dark:bg-gray-700'>
            <h4 className='text-white font-semibold text-center'>
              Notifications
            </h4>
          </div>
          <div className='rounded-b-lg max-h-[450px] overflow-y-scroll scrollbar-hide'>
            <div className='py-2'>
              {visibleNotifications && visibleNotifications.length > 0 ? (
                visibleNotifications?.map((notify, index) => (
                  <Notify
                    notify={notify}
                    underline={visibleNotifications.length - 1 !== index}
                    key={notify._id}
                  />
                ))
              ) : (
                <h1 className='text-black text-center p-2'>No Notifications Right Now.</h1>
              )}
            </div>
            {visibleNotifications &&
              notifications.length > 3 &&
              visibleNotifications.length < notifications.length && (
                <button
                  className='p-2 w-full bg-blue-200 text-center text-blue-500 hover:bg-blue-300 hover:text-blue-500 rounded-b-md'
                  onClick={() => handleShowMore(true)}
                >
                  Show more
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropDown;
