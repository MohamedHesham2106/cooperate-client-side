import React, { Fragment } from 'react';
interface IProps {
  education: IUser['education'];
}
const EducationSection: React.FC<IProps> = ({ education }) => {
  return (
    <Fragment>
      {education ? (
        <div className='flex justify-center flex-col mt-3'>{education}</div>
      ) : (
        <div className='flex justify-center flex-col mt-3'>
          No Education/University added yet.
        </div>
      )}
    </Fragment>
  );
};

export default EducationSection;
