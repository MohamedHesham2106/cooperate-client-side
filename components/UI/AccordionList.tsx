import { FC, ReactNode, useState } from 'react';
import { VscTriangleUp } from 'react-icons/vsc';

interface IProps {
  title: string;
  children: ReactNode;
}

const AccordionList: FC<IProps> = ({ title, children }) => {
  const [showList, setShowList] = useState<boolean>(true);

  return (
    <div className='mt-2 p-2'>
      <div
        onClick={() => setShowList(!showList)}
        className='text-3xl font-medium text-center p-2 text-white rounded-sm shadow-md bg-blue-500 cursor-pointer flex items-center'
      >
        <div className='w-[96%] text-center ml-16 font-sans'>{title}</div>

        <VscTriangleUp
          className={`justify-self-end w-[4%] transition-all ease-in-out ${
            !showList && 'rotate-180'
          }`}
        />
      </div>
      {showList && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 px-2 pt-2'>
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionList;
