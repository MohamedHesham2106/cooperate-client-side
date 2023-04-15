import Link from 'next/link';
import React from 'react';
interface IProps {
  skills: IUser['skills'];
}
const SkillsSection: React.FC<IProps> = ({ skills }) => {
  return (
    <div className='flex mt-2 gap-3 flex-wrap'>
      {skills?.map((skill: ISkill) => (
        <Link
          href={`/jobs?skills=${skill.name}`}
          key={skill._id}
          title={skill.name}
          className='px-4 py-2  text-base rounded-3xl text-green-600 font-semibold bg-green-200 ring-2 ring-offset-2 ring-green-500 '
        >
          {skill.name}
        </Link>
      ))}
    </div>
  );
};

export default SkillsSection;
