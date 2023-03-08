import {
  FC,
  Fragment,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

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
}

const Backdrop: FC<IBackdrop> = ({ onClose }) => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75'
      onClick={onClose}
    />
  );
};

const Overlay: FC<IOverlay> = ({ children, className, tall }) => {
  return (
    <div
      className={`fixed w-[90%] bg-[white] shadow-[0_2px_8px_rgba(0,0,0,0.25)] z-30 animate-[slide-down_300ms_ease-out_forwards] p-4 rounded-lg left-[5%] ${
        tall ? 'top-[5vh]' : 'top-[20vh] max-h-screen overflow-y-auto'
      } md:w-[45rem] md:left-[calc(50%_-_22.5rem)]`}
    >
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
          <Overlay className={className} tall={tall}>
            {children}
          </Overlay>,
          portalElement
        )}
    </Fragment>
  );
};

export default Modal;
