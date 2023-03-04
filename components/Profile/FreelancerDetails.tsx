import { FC, MouseEvent } from 'react';
import { AiOutlineLaptop } from 'react-icons/ai';
import { BiCategory, BiLinkExternal } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { MdEdit } from 'react-icons/md';

interface IProps {
  isOwnProfile: boolean;
  user: IUser;
  ModalHandler?: (event: MouseEvent<SVGAElement | HTMLDivElement>) => void;
}

const FreelancerDetails: FC<IProps> = ({
  isOwnProfile,
  user,
  ModalHandler,
}) => {
  const {
    language = [],
    education = '',
    categories = [],
    personal_projects = [],
    biography = '',
    skills = [],
  } = user;

  const renderLanguages = () => (
    <div className='flex justify-center flex-col w-1/2 mt-3'>
      {language.map(({ language, level }, i) => (
        <div key={i} className='grid grid-cols-[1fr_2fr] items-center'>
          <span className='font-semibold'>{language}:</span>
          <span className='capitalize font-[350] text-gray-600 text-sm '>
            {level}
          </span>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className='flex justify-center flex-col mt-3'>{education}</div>
  );

  const renderWorkCategories = () => (
    <div className='flex justify-center flex-col mt-3 gap-3 cursor-pointer'>
      {categories.map(({ _id, name }) => (
        <span
          key={_id}
          title={name}
          className='px-4 py-2  text-base rounded-md text-blue-600 font-semibold bg-blue-100 '
        >
          {name}
        </span>
      ))}
    </div>
  );

  const renderPersonalProjects = () => (
    <div className='flex justify-center flex-col mt-3 gap-3 cursor-pointer'>
      {personal_projects.map(({ title, url }, i) => (
        <div key={i} className='flex flex-col gap-1'>
          <span title={title} className='mb-2 text-base font-semibold '>
            {title}
          </span>
          <a
            title={title}
            target='_blank'
            rel='noreferrer'
            href={url}
            className='px-4 py-2 flex gap-2 items-center text-sm border-2 sm:w-fit rounded-full text-gray-600 font-semibold bg-gray-100 '
          >
            <span>{title}</span>
            <span>
              <BiLinkExternal size={20} />
            </span>
          </a>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className='flex mt-2 gap-2 flex-wrap'>
      {skills?.map((skill) => (
        <span
          key={skill._id}
          title={skill.name}
          className='px-4 py-2  text-base rounded-3xl text-green-600 font-semibold bg-green-200 '
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
  return (
    <div className=' bg-white flex flex-col md:flex-row justify-between rounded-b-md px-3 my-8 border-t-2'>
      <div className=' md:w-2/6 py-6 px-3  md:border-r-2 md:border-gray-200 flex flex-wrap flex-col gap-5'>
        <div className='flex flex-col justify-between mt-3'>
          <div className='flex items-center gap-2 flex-wrap'>
            <GrLanguage size={18} />
            <span className='font-semibold text-2xl pb-1'>Languages</span>
            {isOwnProfile && (
              <div
                className='cursor-pointer border-2 rounded-full p-[0.3rem] border-blue-500'
                onClick={ModalHandler}
                data-modal-type='language'
              >
                <MdEdit size={12} />
              </div>
            )}
          </div>
          {renderLanguages()}
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2 flex-wrap'>
            <FaGraduationCap size={18} />
            <span className='font-semibold text-2xl pb-1'>Education</span>
          </div>
          {renderEducation()}
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2 flex-wrap'>
            <BiCategory size={18} />
            <span className='font-semibold text-2xl pb-1'>Work Category</span>
          </div>
          {renderWorkCategories()}
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2'>
            <AiOutlineLaptop size={25} />
            <span className='font-semibold text-2xl pb-1'>
              Personal Projects
            </span>
          </div>
          {renderPersonalProjects()}
        </div>
      </div>
      <div className='md:w-4/6 py-6 px-3 flex flex-col gap-y-20'>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <h1 className='font-semibold text-2xl'>Biography</h1>
              {isOwnProfile && (
                <div
                  className='cursor-pointer border-2 rounded-full p-[0.3rem] border-blue-500'
                  onClick={ModalHandler}
                  data-modal-type='bio'
                >
                  <MdEdit size={12} />
                </div>
              )}
            </div>

            <div className='md:p-4 pt-4'>{biography}</div>
          </div>
        </div>
        <div className='flex flex-col border-t-2 border-gray-200 pt-5'>
          <h1 className='font-semibold text-2xl'>Skills</h1>
          {renderSkills()}
        </div>
        <div className='flex flex-col border-t-2 border-gray-200 pt-5'>
          <h1 className='font-semibold text-2xl'>Work History</h1>
          <div className='flex mt-2 gap-2'>
            No work yet. Once you start getting hired on Coo/rate, your work
            with clients will appear here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;
