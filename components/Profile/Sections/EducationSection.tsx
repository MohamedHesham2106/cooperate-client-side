import React from 'react';
interface IProps {
  education: IUser['education'];
}
const EducationSection: React.FC<IProps> = ({ education }) => {
  return <div className='flex justify-center flex-col mt-3'>{education}</div>;
};

export default EducationSection;
