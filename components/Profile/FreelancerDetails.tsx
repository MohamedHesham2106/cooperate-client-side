import React, {
  ChangeEvent,
  FC,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineLaptop } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdEdit, MdLanguage } from 'react-icons/md';

import EducationSection from './Sections/EducationSection';
import LanguageSection from './Sections/LanguageSection';
import PersonalProjectsSection from './Sections/PersonalProjectsSection';
import SkillsSection from './Sections/SkillsSection';
import WorkCategorySection from './Sections/WorkCategorySection';
import { ModalManagerContext } from '../../context/ModalManager';
import axiosInstance from '../../utils/axios';

interface IProps {
  isOwnProfile: boolean;
  user: IUser;
}
interface IModal {
  show: boolean;
  onClose: (boolean: boolean) => void;
}
const ConfirmationModal: FC<IModal> = ({ show, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <Fragment>
      {show && (
        <div className='top-[20vh] flex flex-col gap-5 max-h-screen overflow-y-auto fixed w-[90%] opacity-100 bg-white dark:bg-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.25)] z-50 animate-[slide-down_200ms_ease-out_forwards] p-5 rounded-lg left-[5%] md:w-[45rem] md:left-[calc(50%_-_22.5rem)]  '>
          <p className='text-2xl font-semibold text-center'>
            Are you sure you want to upload your CV?
          </p>
          <div className='flex gap-5 justify-center items-center'>
            <button
              onClick={() => onClose(true)}
              className='inline-flex justify-center font-bold items-center px-6 py-3 w-1/3 text-white bg-green-500 rounded-md hover:bg-green-600 '
            >
              Yes
            </button>
            <button
              onClick={() => onClose(false)}
              className='inline-flex items-center font-bold  justify-center px-6 py-3 w-1/3 text-white bg-red-500 rounded-md hover:bg-red-600 '
            >
              No
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const FreelancerDetails: FC<IProps> = ({ isOwnProfile, user }) => {
  const {
    language = [],
    education = '',
    categories = [],
    personal_projects = [],
    biography = '',
    skills = [],
  } = user;
  const [showModal, setShowModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>();
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const currFile = event.target?.files?.[0];
    setSelectedFile(currFile);
    setShowModal(true);
  };

  const handleCloseModal = async (confirmed: boolean) => {
    if (confirmed && selectedFile) {
      // console.log(confirmed)
      const formData = new FormData();
      formData.append('cv', selectedFile);
      await axiosInstance.put(`/api/user/${user._id}/cv`, formData);
    }

    setShowModal(false);
  };
  const { displayModal } = useContext(ModalManagerContext);
  const handleLanguageModal = () => {
    displayModal('language', {
      userId: user._id,
    });
  };
  const handleBioModal = () => {
    displayModal('bio', {
      userId: user._id,
      bio: biography,
    });
  };

  return (
    <Fragment>
      {showModal && (
        <ConfirmationModal show={showModal} onClose={handleCloseModal} />
      )}
      <div className=' bg-white dark:bg-gray-800 flex flex-col md:flex-row justify-between rounded-b-md px-3 my-8 border-t-2 dark:border-gray-700 '>
        <div className=' md:w-2/6 py-6 px-3  md:border-r-2 dark:border-gray-700 md:border-gray-200 flex flex-wrap flex-col gap-5'>
          <div className='flex flex-col justify-between mt-3'>
            <div className='flex items-center gap-2 flex-wrap'>
              <MdLanguage size={25} />
              <span className='font-semibold text-2xl pb-1'>Languages</span>
              {isOwnProfile && (
                <div
                  className='cursor-pointer border-2 rounded-full p-[0.3rem] border-blue-500 dark:text-blue-200'
                  onClick={handleLanguageModal}
                >
                  <MdEdit size={12} />
                </div>
              )}
            </div>
            <LanguageSection language={language} />
          </div>
          <div className='flex flex-col justify-between mt-9'>
            <div className='flex items-center gap-2 flex-wrap'>
              <FaGraduationCap size={25} />
              <span className='font-semibold text-2xl pb-1'>Education</span>
            </div>
            <EducationSection education={education} />
          </div>
          <div className='flex flex-col justify-between mt-9'>
            <div className='flex items-center gap-2 flex-wrap'>
              <BiCategory size={25} />
              <span className='font-semibold text-2xl pb-1'>Work Category</span>
            </div>
            <WorkCategorySection categories={categories} />
          </div>
          <div className='flex flex-col justify-between mt-9'>
            <div className='flex items-center gap-2'>
              <AiOutlineLaptop size={25} />
              <span className='font-semibold text-2xl pb-1'>
                Personal Projects
              </span>
            </div>
            <PersonalProjectsSection personal_projects={personal_projects} />
          </div>
          <div className='flex flex-col gap-3 mt-9'>
            <div className='flex items-center gap-2'>
              <IoIosPaper size={25} />
              <span className='font-semibold text-2xl pb-1'>CV</span>
            </div>
            <div className='flex items-center justify-center'>
              {isOwnProfile ? (
                <label className='rounded relative inline-flex group items-center w-full justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'>
                  <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-16 opacity-10'></span>
                  <span className='relative flex flex-col items-center justify-center'>
                    Upload CV <span className='text-xs'>(PDF ONLY)</span>
                  </span>
                  <input
                    type='file'
                    className='hidden'
                    accept='application/pdf'
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                user.CvUrl && (
                  <a
                    href={user.CvUrl?.replace(
                      '/upload/',
                      '/upload/fl_attachment/'
                    )}
                    className='rounded relative inline-flex group items-center w-full  justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 border-blue-700 text-white'
                  >
                    <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-32 opacity-10'></span>
                    <span className='relative '>Download CV</span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <div className='md:w-4/6 py-6  flex flex-col gap-y-20'>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-3 px-3'>
                <h1 className='font-semibold text-2xl'>Biography</h1>
                {isOwnProfile && (
                  <div
                    className='cursor-pointer border-2 rounded-full p-[0.3rem] border-blue-500 dark:text-blue-200'
                    onClick={handleBioModal}
                  >
                    <MdEdit size={12} />
                  </div>
                )}
              </div>

              <div className='md:p-4 pt-4'>{biography}</div>
            </div>
          </div>
          <div className='flex flex-col border-t-2 px-3 dark:border-gray-700 border-gray-200 pt-5'>
            <h1 className='font-semibold text-2xl'>Skills</h1>
            <SkillsSection skills={skills} />
          </div>
          <div className='flex flex-col border-t-2 px-3 dark:border-gray-700 border-gray-200 pt-5'>
            <h1 className='font-semibold text-2xl'>Work History</h1>
            <div className='flex mt-2 gap-2'>
              No work yet. Once you start getting hired on Coo/rate, your work
              with clients will appear here.
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FreelancerDetails;
