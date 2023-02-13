import { useEffect, useState } from 'react';

export const useScrollPosition = () => {
  const [position, setPosition] = useState(10);
  useEffect(() => {
    const updatePosition = () => {
      setPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);
  return position;
};
