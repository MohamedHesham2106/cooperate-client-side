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
            <div className='py-2'>
              <a href='#' className='flex items-center px-4 py-3 border-b'>
                <p className='text-gray-600 text-sm mx-2'>
                  <span className='font-bold'>Sara Salah</span> replied on the{' '}
                  <span className='font-bold text-blue-500'>Upload Image</span>{' '}
                  artical . 2m
                </p>
              </a>
              <a href='#' className='flex items-center px-4 py-3 border-b  '>
                <p className='text-gray-600 text-sm mx-2'>
                  <span className='font-bold'>Slick Net</span> start following
                  you . 45m
                </p>
              </a>
              <a href='#' className='flex items-center px-4 py-3 border-b '>
                <p className='text-gray-600 text-sm mx-2'>
                  <span className='font-bold'>Jane Doe</span> Like Your reply on{' '}
                  <span className='font-bold text-blue-500'>Test with TDD</span>{' '}
                  artical . 1h
                </p>
              </a>
              <a href='#' className='flex items-center px-4 py-3 '>
                <p className='text-gray-600 text-sm mx-2'>
                  <span className='font-bold'>Abigail Bennett</span> start
                  following you . 3h
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropDown;
