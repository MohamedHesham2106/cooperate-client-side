import { useRouter } from 'next/router';
import {
  FC,
  Fragment,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { BsChat } from 'react-icons/bs';
import { HiOutlineDownload } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';

import MilestoneList from '../Milestones/MilestoneList';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';
import { getTimeDifference } from '../../utils/date';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  project?: IProject;
}

const ProjectDetails: FC<IProps> = ({ project, onClose }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = project && project.job.description.slice(0, 200);
  const shouldShowMore = project && project.job.description.length > 200;
  const toggleDescription = () => setShowFullDescription(!showFullDescription);
  const showMore = shouldShowMore ? '...' : '';
  const [file, setFile] = useState<File | null>(null);
  const handleOndragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const validFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/zip',
    'application/gzip',
    'application/x-tar',
    'application/x-bzip',
    'application/x-bzip2',
    'application/x-ace-compressed',
    'application/x-gzip',
    'application/x-stuffit',
    'application/x-stuffitx',
    'application/x-tar-gz',
    'application/x-tar-bz2',
    'application/x-tar-lzma',
    'application/x-tar-xz',
    'application/x-zip-compressed',
  ];

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currFile = event.target?.files?.[0];
    if (currFile && validFileTypes.includes(currFile.type)) {
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

  const handleOndrop = (event: React.DragEvent<HTMLDivElement>) => {
    // prevent the browser from opening the file
    event.preventDefault();
    event.stopPropagation();
    // grab the file
    const currFile = event.dataTransfer.files[0];
    if (currFile && validFileTypes.includes(currFile.type)) {
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

  const removeImage = () => {
    setFile(null);
  };
  const { refreshToken } = useContext(AuthContext);
  const role = getPayloadFromToken(refreshToken).role;
  const [createdAt, setCreatedAt] = useState<string | undefined>();
  const router = useRouter();
  useEffect(() => {
    if (project) {
      setCreatedAt(getTimeDifference(new Date(project.createdAt).getTime()));
    }
  }, [project, project?.createdAt]);

  const createChatHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await axiosInstance
      .post('/api/conversation', {
        Freelancer_id: project?.Freelancer_id,
        client_id: project?.client_id,
      })
      .then((response) =>
        router.push(`/chat?cid=${response.data.conversation._id}`)
      )
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        toast.error(message, {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      });
  };

  return (
    <Fragment>
      {project && (
        <Modal
          onClose={onClose}
          className='p-2 flex flex-col gap-5 justify-between'
          tall={true}
        >
          <div className='grid grid-cols-2 items-center'>
            <span className='text-xs text-gray-400'>Started {createdAt}</span>
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

          <section className='shadow-md flex items-center justify-between p-5 rounded-md bg-blue-200'>
            <div className='flex items-center gap-2'>
              <h4 className='text-base'>Status:</h4>
              <div className='rounded-full border text-sm bg-white py-1 px-2 shadow border-orange-400'>
                {project.project_status}
              </div>
            </div>
            <div>
              <Button
                type='button'
                className='text-orange-500 bg-orange-200 hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center'
              >
                Mark as Complete
              </Button>
            </div>
          </section>
          <section className='shadow-md flex flex-col gap-5 justify-between p-5 rounded-md bg-blue-200'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold'>Description</h3>
              <p className='whitespace-pre-wrap'>
                {showFullDescription
                  ? project.job.description
                  : truncatedDescription + showMore}
                {shouldShowMore && (
                  <Button
                    type='button'
                    className='text-orange-500 hover:text-orange-700 focus:outline-none'
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? ' Show less' : ' Show more'}
                  </Button>
                )}
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-base font-semibold'>
                Skills &amp; Expertise
              </h3>
              <div className='flex gap-2 items-center'>
                {project.job.skills?.map((skill: ISkill) => (
                  <span
                    key={skill._id}
                    className='px-4 py-2 shadow  text-xs rounded-3xl text-orange-500 font-semibold bg-orange-200 '
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold'>Attachments</h3>
              {role && role === 'freelancer' && (
                <div className='mt-5 rounded-sm flex items-center flex-col justify-center'>
                  <div
                    onDragOver={handleOndragOver}
                    onDrop={handleOndrop}
                    className='h-24 w-4/5 bg-white overflow-hidden relative border-2 items-center rounded-sm cursor-pointer   border-orange-300 border-dotted'
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
                      <div className='w-full h-16 flex items-center justify-between rounded p-3 bg-orange-200 shadow'>
                        <div className='flex flex-row items-center gap-2'>
                          <span className='truncate w-44'>{file.name}</span>
                        </div>
                        <div
                          onClick={removeImage}
                          className='h-6 w-6 bg-red-500 flex items-center cursor-pointer justify-center rounded-sm'
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
                  className='text-white bg-orange-600 focus:outline-none focus:ring-4  font-medium rounded-md text-sm px-5 py-2.5 text-center'
                  disabled={!file}
                >
                  {file ? (
                    <div className='flex items-center justify-center gap-2'>
                      {file.name}
                      <HiOutlineDownload
                        className='text-white mb-1'
                        size={20}
                      />
                    </div>
                  ) : (
                    'No file attached'
                  )}
                </Button>
              )}
            </div>
          </section>
          <section className='shadow-md flex flex-col gap-5  p-5 rounded-md bg-blue-200'>
            <h3 className='text-lg font-semibold'>Milestone</h3>

            <MilestoneList
              role={role}
              milestones={project.milestone}
              projectId={project._id}
            />
          </section>
        </Modal>
      )}
    </Fragment>
  );
};

export default ProjectDetails;
