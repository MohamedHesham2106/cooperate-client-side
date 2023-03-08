import { FC, useEffect, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

const FloatingActionButton: FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      title='Scroll Up'
      className={`fixed z-90 bottom-10 right-8 bg-orange-400 p-2 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-orange-600 hover:drop-shadow-2xl ${
        showButton ? '' : 'hidden'
      }`}
      onClick={handleClick}
    >
      <HiArrowUp size={25} />
    </button>
  );
};

export default FloatingActionButton;
