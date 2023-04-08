import {
  FC,
  Fragment,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineX } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';

interface IBackdrop {
  onClose: (event: MouseEvent<HTMLDivElement>) => void;
}

interface IModal {
  onClose: (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  children: ReactNode;
  className: string;
  tall?: boolean;
}

interface IOverlay {
  children: ReactNode;
  className: string;
  tall: boolean;
  onClose: (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const Backdrop: FC<IBackdrop> = ({ onClose }) => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75'
      onClick={onClose}
    />
  );
};

const Overlay: FC<IOverlay> = ({ children, className, tall, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className={` ${
        tall
          ? 'top-0 min-h-screen max-h-screen right-0 overflow-y-auto fixed bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] z-50 animate-[slide-right_200ms_ease-out_forwards]   p-4 lg:rounded-tl-lg rounded-bl-lg lg:w-[45rem] w-full '
          : 'top-[20vh] max-h-screen overflow-y-auto fixed w-[90%] bg-[white] shadow-[0_2px_8px_rgba(0,0,0,0.25)] z-50 animate-[slide-down_200ms_ease-out_forwards] p-4 rounded-lg left-[5%] md:w-[45rem] md:left-[calc(50%_-_22.5rem)]'
      }  `}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        type='button'
        className='absolute right-[3%] top-[3%] cursor-pointer z-50 bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none '
      >
        {tall ? <IoIosArrowForward size={25} /> : <HiOutlineX size={25} />}
      </button>
      <div className={className}>{children}</div>
    </div>
  );
};

const Modal: FC<IModal> = ({ onClose, children, className, tall = false }) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('overlay');
    setPortalElement(el);
  }, []);

  return (
    <Fragment>
      {portalElement &&
        createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {portalElement &&
        createPortal(
          <Overlay className={className} tall={tall} onClose={onClose}>
            {children}
          </Overlay>,
          portalElement
        )}
    </Fragment>
  );
};

export default Modal;
