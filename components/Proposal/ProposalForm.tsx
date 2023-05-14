import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { ImCross } from 'react-icons/im';

import SkillsSection from '../Profile/Sections/SkillsSection';
import Button from '../UI/Button';
import Form from '../UI/Form';
import Input from '../UI/Input';
import { useNotification } from '../../context/NotificationProvider';
import axiosInstance from '../../utils/axios';

interface IProps {
  userId: IUser['_id'];
  job: IJobs;
}
interface IProposal {
  cover_letter?: string;
  website_link?: string;
}
const ProposalForm: FC<IProps> = ({ userId, job }) => {
  const { sendNotification } = useNotification();

  const [proposal, setProposal] = useState<IProposal>({
    cover_letter: '',
    website_link: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const MAX_CHARACTERS = 3000;

  // Calculate the number of characters left for the cover letter
  const coverLetterLength = proposal.cover_letter?.length;
  const charactersLeft = MAX_CHARACTERS - Number(coverLetterLength);

  // Handle input change for cover letter and website link
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProposal((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Prevent default behavior when dragging over the element
  const handleOndragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handle file selection from input
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currFile = event.target?.files?.[0];
    const validFileTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (currFile && validFileTypes.includes(currFile.type)) {
      setFile(currFile);
    } else {
      toast.error('Only Word and PDF files are accepted.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    }
  };

  // Handle file drop event
  const handleOndrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const currFile = event.dataTransfer.files[0];
    const validFileTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (currFile && validFileTypes.includes(currFile.type)) {
      setFile(currFile);
    } else {
      toast.error('Only Word and PDF files are accepted.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
    }
  };

  // Remove the selected file
  const removeImage = () => {
    setFile(null);
  };

  // Handle form submission
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { cover_letter, website_link } = proposal;
    if (cover_letter?.length === 0) {
      toast.error('Please Fill The Cover Letter.', {
        style: {
          border: '1px solid #ce1500',
          padding: '16px',
        },
      });
      return;
    }
    await axiosInstance
      .post(`/api/proposal/${userId}`, {
        cover_letter,
        website_link,
        job_id: job._id,
      })
      .then((response) => {
        const { proposal } = response.data;
        console.log(proposal);
        sendNotification(
          userId,
          proposal.client_id as string,
          `Sent Proposal For ${job.title}`,
          `/proposals/~${proposal.client_id}`
        );
        toast.success('Proposal Sent!', {
          style: {
            border: '1px solid #07bd3a',
            padding: '16px',
          },
        });
      })
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
    <section className='flex flex-col gap-4 p-5 dark:bg-gray-700'>
      <h2 className='text-4xl font-black text-center p-5 text-white rounded-lg shadow-md mb-5 bg-blue-500 dark:bg-gray-800 capitalize'>
        {job.title}
      </h2>
      <div className='grid grid-cols-2 gap-4'>
        <div className='border-r-2 border-gray-200 flex flex-col p-5 gap-2'>
          <h2 className='text-lg font-medium '>Job Description:</h2>
          <p className='p-2 whitespace-pre-wrap'>{job.description}</p>

          <h2 className='text-lg font-medium mt-5'>Experience &amp; Budget:</h2>
          <section className='grid grid-cols-2 items-center text-center  font-semibold text-sm'>
            <div className='flex flex-col gap-1'>
              <span>Fixed-price</span>
              <span className='text-xs font-light text-black dark:text-blue-500'>
                ${job.budget.toFixed(2)}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span>Experience</span>
              <span className='text-xs font-light text-black capitalize dark:text-blue-500'>
                {job.experience_level} Level
              </span>
            </div>
          </section>
          <h2 className='text-lg font-medium  mt-5'>
            Skills &amp; Expertise Required:
          </h2>
          <section>
            <div className='flex mt-2 gap-2 flex-wrap items-center justify-center'>
              {job.skills && (
                <SkillsSection
                  skills={job.skills}
                  bg='bg-blue-200'
                  color='text-blue-500'
                />
              )}
            </div>
          </section>
        </div>
        <div className='p-5 flex flex-col'>
          <h2 className='text-2xl font-bold '>Submit a Proposal:</h2>
          <Form className='mt-10 flex flex-col gap-5' OnSubmit={submitHandler}>
            <section className='flex flex-col gap-4 relative'>
              <h3 className='text-left text-lg font-bold'>Cover Letter</h3>
              <textarea
                name='cover_letter'
                onChange={handleChange}
                rows={8}
                className='block p-5 w-full text-sm text-gray-800 bg-white border-2  rounded-md border-gray-300 outline-none focus:border-blue-400 resize-none dark:bg-gray-900 dark:border-gray-900 dark:text-white'
                value={proposal.cover_letter}
                maxLength={MAX_CHARACTERS}
              ></textarea>
              <span className='absolute bottom-3 right-3 text-gray-400'>
                {charactersLeft} characters left
              </span>
            </section>
            <h3 className='text-left text-lg font-bold'>
              Website Link (Optional)
            </h3>
            <section className='flex flex-col'>
              <div className='flex flex-col gap-2'>
                <Input
                  value={proposal.website_link}
                  onChange={handleChange}
                  required={false}
                  name='website_link'
                  type='url'
                  placeholder='Enter your portfolio link'
                />
              </div>
            </section>
            <h3 className='text-left text-lg font-bold'>
              Attachments (Optional)
            </h3>
            <section className='w-full rounded-md'>
              <div
                onDragOver={handleOndragOver}
                onDrop={handleOndrop}
                className='h-28 w-full overflow-hidden relative border-2 items-center rounded-md cursor-pointer   border-gray-300 border-dotted'
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
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    PDF or WORD
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap gap-2 mt-2'>
                {file && (
                  <div className='w-full h-16 flex items-center justify-between rounded p-3 bg-blue-200 shadow'>
                    <div className='flex flex-row items-center gap-2'>
                      <div className='h-12 w-12 '></div>
                      <span className='truncate w-44'>{file.name}</span>
                    </div>
                    <div
                      onClick={removeImage}
                      className='h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm'
                    >
                      <ImCross color='#fff' />
                    </div>
                  </div>
                )}
              </div>
            </section>
            <div className='flex justify-end'>
              <Button type='submit' width='md:w-1/2 w-full'>
                Send Proposal
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ProposalForm;
