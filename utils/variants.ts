export const fadeIn = (direction: string, delay: number) => {
  let x = 0;
  let y = 0;
  
  switch (direction) {
    case 'up':
      y = 80;
      break;
    case 'down':
      y = -80;
      break;
    case 'left':
      x = 20;
      break;
    case 'right':
      x = -20;
      break;
  }
  
  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
