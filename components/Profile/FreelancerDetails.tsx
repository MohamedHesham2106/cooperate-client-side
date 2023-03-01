import { FC } from 'react';
import { AiOutlineLaptop } from 'react-icons/ai';
import { BiCategory, BiLinkExternal } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
interface IProps {
  isOwnProfile: boolean;
  user: IUser;
}
const FreelancerDetails: FC<IProps> = ({ isOwnProfile, user }) => {
  const {
    language,
    education,
    categories,
    personal_projects,
    biography,
    skills,
  } = user;
  return (
    <div className=' bg-white flex flex-col md:flex-row justify-between rounded-b-md px-3 my-8 border-t-2'>
      <div className=' md:w-2/6 py-6 px-3  md:border-r-2 md:border-gray-200 flex flex-wrap flex-col gap-5'>
        <div className='flex flex-col justify-between mt-3'>
          <div className='flex items-center gap-2'>
            <GrLanguage size={18} />
            <span className='font-semibold text-2xl pb-1'>Languages</span>
          </div>
          <div className='flex justify-center flex-col w-1/2 mt-3'>
            {language?.map((language) => (
              <div key={language._id} className='flex items-center gap-1'>
                <span className='font-semibold'>{language.language}</span>:
                <span className='capitalize'>{language.level}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2'>
            <FaGraduationCap size={25} />
            <span className='font-semibold text-2xl pb-1'>Education</span>
          </div>
          <div className='flex justify-center flex-col mt-3'>{education}</div>
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2'>
            <BiCategory size={25} />
            <span className='font-semibold text-2xl pb-1'>Work Categories</span>
          </div>
          <div className='flex justify-center flex-col mt-3 gap-3 cursor-pointer'>
            {categories?.map((category) => (
              <span
                key={category._id}
                title={category.name}
                className='px-4 py-2  text-base rounded-md text-blue-600 font-semibold bg-blue-100 '
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-between mt-9'>
          <div className='flex items-center gap-2'>
            <AiOutlineLaptop size={25} />
            <span className='font-semibold text-2xl pb-1'>
              Personal Projects
            </span>
          </div>
          <div className='flex justify-center flex-col mt-3 gap-3 cursor-pointer'>
            {personal_projects?.map((project) => (
              <div key={project._id} className='flex flex-col gap-1'>
                <span
                  title={project.title}
                  className='mb-2 text-base font-semibold '
                >
                  {project.title}
                </span>
                <a
                  title={project.title}
                  target='_blank'
                  rel='noreferrer'
                  href={project.url}
                  className='px-4 py-2 flex gap-2 items-center text-sm border-2 sm:w-fit rounded-full text-gray-600 font-semibold bg-gray-100 '
                >
                  <span>{project.title}</span>
                  <span>
                    <BiLinkExternal size={20} />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='md:w-4/6 py-6 px-3 flex flex-col gap-y-20'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl'>Biography</h1>
          <div className='md:p-4 pt-4 flex flex-wrap'>{biography}</div>
        </div>
        <div className='flex flex-col border-t-2 border-gray-200 pt-5'>
          <h1 className='font-semibold text-2xl'>Skills</h1>
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
