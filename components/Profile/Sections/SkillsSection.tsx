import React from 'react';
interface IProps {
  skills: IUser['skills'];
  color?: string;
  bg?: string;
}
const SkillsSection: React.FC<IProps> = ({
  skills,
  color = 'text-blue-700 ',
  bg = 'bg-blue-200 ',
}) => {
  return (
    <div className='flex mt-2 gap-3 flex-wrap'>
      {skills?.map((skill: ISkill) => (
        <div
          key={skill._id}
          title={skill.name}
          className={`px-4 py-2 cursor-pointer  text-sm rounded-3xl ${color} font-bold ${bg} shadow-md dark:shadow-gray-900 dark:border-2 dark:border-gray-900 `}
        >
          {skill.name}
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
