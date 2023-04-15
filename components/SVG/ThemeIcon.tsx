import { useTheme } from 'next-themes';
import { FC, Fragment, useEffect, useState } from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';

const ThemeIcon: FC = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState<React.ReactNode>();

  useEffect(() => {
    const handleIcon = () => {
      if (theme === 'dark') {
        setIcon(
          <BsSun
            onClick={() => setTheme('light')}
            size={25}
            className='cursor-pointer mt-1 mr-3 text-orange-400 hover:text-orange-500'
          />
        );
      } else {
        setIcon(
          <BsMoonStars
            onClick={() => setTheme('dark')}
            size={20}
            className='cursor-pointer mt-1 mr-3 text-blue-500 hover:text-blue-700'
          />
        );
      }
    };

    handleIcon();
  }, [setTheme, theme]);

  return <Fragment>{icon}</Fragment>;
};

export default ThemeIcon;
