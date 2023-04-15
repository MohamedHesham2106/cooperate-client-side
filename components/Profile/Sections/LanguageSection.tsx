import React from 'react';
interface IProps {
  language?: { language: string; level: string }[];
}
const LanguageSection: React.FC<IProps> = ({ language }) => {
  return (
    <div className='flex justify-center flex-col w-1/2 mt-3'>
      {language?.map(({ language, level }, i) => (
        <div key={i} className='grid grid-cols-[1fr_2fr] gap-1 items-center'>
          <span className='font-bold '>{language}:</span>
          <span className='capitalize font-[350] text-gray-600 text-sm dark:text-white '>
            {level}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LanguageSection;
