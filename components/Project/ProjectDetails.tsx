import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment, MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsChat } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { IoMdDownload } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';

import MilestoneList from '../Milestones/MilestoneList';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { useAuthenticate } from '../../context/AuthProvider';
import { useNotification } from '../../context/NotificationProvider';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';
import { getTimeDifference } from '../../utils/date';
import { projectFileType } from '../../utils/validations';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  project?: IProject;
}

const ProjectDetails: FC<IProps> = ({ project, onClose }) => {
  const { uuid, refreshToken } = useAuthenticate(); // Get the UUID and refreshToken using the useAuthenticate hook
  const { sendNotification } = useNotification(); // Get the sendNotification function using the useNotification hook
  const [showFullDescription, setShowFullDescription] = useState(false); // State variable to track whether the full description should be shown or not

  const [file, setFile] = useState<File | null>(null); // State variable to store the selected file
  const role = getPayloadFromToken(refreshToken)?.role; // Extract the role from the refreshToken
  const [createdAt, setCreatedAt] = useState<string | undefined>(); // State variable to store the time difference between project creation and current time
  const router = useRouter();

  // Truncate the project description to 200 characters
  const truncatedDescription = project && project.job.description.slice(0, 200);

  // Determine whether the full description should be shown based on the length of the description
  const shouldShowMore = project && project.job.description.length > 200;

  // Function to toggle the value of showFullDescription
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  // Append ellipsis if the description is truncated
  const showMore = shouldShowMore ? '...' : '';

  // View Profile URL
  const viewProfileURL = `/${
    role === 'freelancer' ? 'client' : 'freelancer'
  }/~${role === 'freelancer' ? project?.client_id : project?.Freelancer_id}`;

  // Function to handle the drag-over event
  const handleOndragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Function to handle the file selection event
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currFile = event.target?.files?.[0];
    if (currFile && projectFileType.includes(currFile.type)) {
      setFile(currFile);
    } else {
      toast.error('Only zip, rar, jpeg, png, and gif files are accepted.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    }
  };

  // Function to handle the drop event when a file is dropped onto the component
  const handleOndrop = (event: React.DragEvent<HTMLDivElement>) => {
    // Prevent the browser from opening the file
    event.preventDefault();
    event.stopPropagation();
    // Grab the dropped file
    const currFile = event.dataTransfer.files[0];
    if (currFile && projectFileType.includes(currFile.type)) {
      setFile(currFile);
    } else {
      toast.error('Only zip, rar, jpeg, png, and gif files are accepted.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    }
  };

  // Function to remove the selected image
  const removeImage = () => {
    setFile(null);
  };

  // Update the createdAt state when the project or project.createdAt changes
  useEffect(() => {
    if (project) {
      setCreatedAt(getTimeDifference(new Date(project.createdAt).getTime()));
    }
  }, [project, project?.createdAt]);

  // Function to create a chat conversation and navigate to the chat page
  const createChatHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await axiosInstance
      .post('/api/conversation', {
        Freelancer_id: project?.Freelancer_id,
        client_id: project?.client_id,
      })
      .then((_response) =>
        router.push(
          `/chat?conversation=${
            uuid !== project?.Freelancer_id
              ? project?.Freelancer_id
              : project?.client_id
          }`
        )
      )
      .catch((_error) => {
        router.push(
          `/chat?conversation=${
            uuid !== project?.Freelancer_id
              ? project?.Freelancer_id
              : project?.client_id
          }`
        );
      });
  };

  // Function to handle the completion of the project
  const handleCompletion = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await axiosInstance.put(`/api/project/${uuid}`, {
        projectId: project?._id,
      });
      toast.success('Incredible! Project have been completed.');
      sendNotification(
        uuid,
        project?.Freelancer_id as string,
        `Marked Project as Complete for ${project?.job.title}`,
        `/ongoing-projects/~${project?.Freelancer_id}`
      );
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      const err = error as IError;
      const { message } = err.response.data;
      toast.error(message, {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    }
  };

  // Send a notification to the freelancer
  const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!file) {
      toast.error("Can't Submit empty project.");
      return;
    }
    const formData = new FormData();
    formData.append('project', file);
    await axiosInstance
      .put(`/api/project/${project?._id}/uploadProject`, formData)
      .then((_response) => {
        sendNotification(
          uuid,
          project?.client_id as string,
          `Submitted File for ${project?.job.title}`,
          `/ongoing-projects/~${project?.client_id}`
        );
        toast.success('Project Submitted Successfully');
        setTimeout(() => {
          router.reload();
        }, 1000);
      })
      .catch((_error) => {
        toast.error('Something went wrong.');
      });
  };

  return (
    <Fragment>
      {project && (
        <Modal
          onClose={onClose}
          className='p-2 flex flex-col gap-5 justify-between'
          Side
        >
          <div className='grid grid-cols-[9fr_9fr_1fr] gap-2 items-center'>
            <div className='flex flex-col gap-2'>
              <span className='text-xs text-gray-400'>Started {createdAt}</span>
              <Link
                href={viewProfileURL}
                className='px-5 py-2 rounded-md bg-blue-500 w-1/2 text-sm text-white text-center dark:bg-gray-900 dark:hover:bg-gray-800 hover:bg-blue-600'
              >
                View Profile
              </Link>
            </div>

            <div className='flex justify-end'>
              <Button
                onClick={createChatHandler}
                type='button'
                className='relative w-2/5 inline-flex items-center justify-center p-4 px-5 py-1 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group'
              >
                <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease'>
                  <BsChat size={15} />
                </span>
                <span className='absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease'>
                  Chat
                </span>
                <span className='relative invisible'>Chat</span>
              </Button>
            </div>
          </div>

          <section className='shadow-md flex items-center justify-between p-5 rounded-md border-2 dark:border-gray-800 dark:bg-gray-800 text-gray-700'>
            <div className='flex items-center gap-2'>
              <h4 className='text-lg font-bold dark:text-white'>Status:</h4>
              <div
                className={`rounded-full border text-sm text-white dark:border-none py-1 px-2 shadow font-bold ${
                  project.project_status === 'Complete'
                    ? 'bg-green-400 '
                    : 'bg-blue-500'
                }`}
              >
                {project.project_status}
              </div>
            </div>
            {project.project_status === 'In progress' && role === 'client' && (
              <div>
                <Button
                  type='button'
                  onClick={handleCompletion}
                  className='text-white bg-blue-400 hover:bg-blue-600  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center'
                >
                  Mark as Complete
                </Button>
              </div>
            )}
          </section>
          <section className='shadow-md flex flex-col gap-5 dark:border-gray-800 dark:bg-gray-800 justify-between p-5 rounded-md border-2'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl text-gray-700 dark:text-gray-200 font-bold'>
                Description
              </h3>
              <p className='whitespace-pre-wrap'>
                {showFullDescription
                  ? project.job.description
                  : truncatedDescription + showMore}
                {shouldShowMore && (
                  <Button
                    type='button'
                    className='text-blue-500 hover:text-blue-700 focus:outline-none'
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? ' Show less' : ' Show more'}
                  </Button>
                )}
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-xl text-gray-700 dark:text-gray-200  font-bold'>
                Skills &amp; Expertise
              </h3>
              <div className='flex gap-2 items-center'>
                {project.job.skills?.map((skill: ISkill) => (
                  <span
                    key={skill._id}
                    className='px-4 py-2 flex text-center  shadow text-xs rounded-md text-white font-semibold bg-blue-500 '
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center justify-between'>
                <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200'>
                  Attachments
                </h3>

                {role === 'freelancer' && (
                  <Button
                    onClick={submitHandler}
                    className='rounded-full bg-blue-500 p-3 text-white shadow-md hover:bg-blue-600'
                  >
                    <TiTick size={20} title='submit project' />
                  </Button>
                )}
              </div>

              {role && role === 'freelancer' && (
                <div className='mt-5 rounded-sm flex items-center flex-col justify-center'>
                  <div
                    onDragOver={handleOndragOver}
                    onDrop={handleOndrop}
                    className='h-24 w-4/5 bg-white overflow-hidden relative border-2 items-center rounded-sm cursor-pointer   border-gray-300 border-dotted'
                  >
                    <input
                      type='file'
                      onChange={handleFile}
                      className='h-full w-full opacity-0 z-10 absolute'
                      name='files'
                    />
                    <div className='h-full w-full absolute z-1 flex flex-col justify-center items-center top-0 p-2'>
                      <svg
                        aria-hidden='true'
                        className='w-20 h-20 mb-3 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                        ></path>
                      </svg>
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        Zip, RAR, PNG, JPEG and GIF
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2 w-4/5'>
                    {file && (
                      <div className='w-full h-16 flex items-center justify-between rounded p-3 bg-gray-700 dark:bg-blue-600 shadow'>
                        <div className='flex flex-row items-center gap-2'>
                          <span className='truncate w-44 text-white'>
                            {file.name}
                          </span>
                        </div>
                        <div
                          onClick={removeImage}
                          className='h-6 w-6 bg-red-500 hover:bg-red-700 flex items-center cursor-pointer justify-center rounded-sm'
                        >
                          <ImCross color='#fff' />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {role === 'client' && (
                <Button
                  type='button'
                  className='text-white bg-gray-800 focus:outline-none focus:ring-4  font-medium rounded-md text-sm px-5 py-2.5 text-center'
                  disabled={!file}
                >
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl?.replace(
                        '/upload/',
                        '/upload/fl_attachment/'
                      )}
                      className='rounded relative inline-flex group items-center w-full  justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-r from-gray-800 dark:from-blue-400 to-gray-900 dark:to-blue-500 border-gray-800 dark:border-blue-500 text-white'
                    >
                      <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-10 opacity-10'></span>
                      <span className='relative flex items-center gap-2 font-bold text-base'>
                        Download File{' '}
                        <IoMdDownload
                          size={20}
                          className='p-1 bg-white text-black rounded-full dark:bg-blue-800 dark:text-white'
                        />
                      </span>
                    </a>
                  ) : (
                    'No file attached'
                  )}
                </Button>
              )}
            </div>
          </section>
          <section className='dark:bg-gray-800 dark:border-gray-800 shadow-md flex flex-col gap-5  p-5 rounded-md border-2 '>
            <h3 className='text-xl font-bold'>Milestone</h3>

            <MilestoneList
              isComplete={project.project_status === 'Complete'}
              role={role}
              milestones={project.milestone}
              projectId={project._id}
            />
          </section>
          {project?.project_status === 'Complete' && (
            <div className='flex items-center gap-5 w-full'>
              <Link
                href={`/feedback/~${project._id}`}
                className='w-full rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 dark:active:border-gray-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 dark:from-gray-600 dark:to-gray-500 border-blue-700 dark:border-gray-700 text-white'
              >
                <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-12 opacity-10'></span>
                <span className='relative'>Give Feedback</span>
              </Link>
              <Link
                href={`/report/~${project._id}`}
                className='w-full rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 dark:active:border-gray-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 dark:from-gray-600 dark:to-gray-500 border-blue-700 dark:border-gray-700 text-white'
              >
                <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-12 opacity-10'></span>
                <span className='relative'>Report User</span>
              </Link>
            </div>
          )}
        </Modal>
      )}
    </Fragment>
  );
};

export default ProjectDetails;
