import { FC, useEffect, useRef, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
const NotificationDropDown: FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
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
  return (
    <div className='relative' ref={menuRef}>
      <div
        className=' p-0.5 flex items-center justify-center rounded-full cursor-pointer hover:ring-2 hover:ring-gray-200 focus:outline-none focus:shadow-outline'
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <HiOutlineBell size={30} />
      </div>
      <div
        className='top-10 md:right-9 right-0 absolute w-auto max-w-lg  min-w-[400px] border flex flex-col bg-white shadow rounded-lg box-border'
        style={{
          opacity: !showDropDown ? '0' : '1',
          transition: '0.3s ease',
          visibility: !showDropDown ? 'hidden' : 'visible',
          transform: !showDropDown ? 'scale(0.9)' : 'scale(1)',
          transformOrigin: 'top right',
        }}
      >
        <div className='flex flex-col gap-2 '>
          <div className=' bg-blue-500 p-2 rounded-t-lg'>
            <h4 className='text-white font-semibold text-center'>
              Notifications
            </h4>
          </div>
          <div className='rounded-b-lg'>
            <a href='#' className='flex px-4 py-3 hover:bg-gray-100  '>
              <div className='w-full'>
                <div className='text-gray-500 text-sm mb-1.5 '>
                  You've Received Proposal From
                  <span className='font-semibold text-gray-900 '>
                    {' '}
                    Mohamed Hesham
                  </span>
                </div>
                <div className='flex justify-end'>
                  <div className='text-xs text-blue-600'>a few moments ago</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropDown;
