import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '../../../components/UI/Button';
import axiosInstance from '../../../utils/axios';
import { getPayloadFromToken } from '../../../utils/cookie';

interface IProps {
  project: IProject;
  userId: string;
  targetId: string;
}

const Report: NextPage<IProps> = ({ project, userId, targetId }) => {
  const [report, setReport] = useState<string>('');

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setReport(value);
  };
  const onSubmitReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (report.trim().length === 0) {
      toast.error('You Must Write a Reason.');
      return;
    }
    try {
      await axiosInstance.post(`/api/report/${userId}`, {
        targetId: targetId,
        projectId: project.job.toString(),
        feedback: report,
      });
      toast.success(
        'Thank you for submitting your report. We appreciate your assistance in helping us maintain a safe experience'
      );
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      //   console.log(error);
    }
  };
  const MAX_CHARACTERS = 400;
  const descriptionLength = report?.length;
  const charactersLeft = MAX_CHARACTERS - Number(descriptionLength);
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className='md:w-9/12 w-11/12 mx-auto my-24 border flex flex-col border-gray-300 rounded-md shadow-lg p-5 gap-4 dark:bg-gray-700 dark:border-gray-800'
    >
      <h1 className='font-bold text-center text-4xl'>Report User</h1>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-2 relative'>
          <h3 className='text-left text-lg font-semibold'>
            Tell us about your experience
          </h3>
          <textarea
            name='feedback'
            rows={8}
            value={report}
            onChange={handleChange}
            className='block p-5 w-full text-sm text-gray-800 bg-white border border-gray-400 outline-none focus:border-blue-500 resize-none dark:bg-gray-900 dark:focus:border-gray-500 dark:text-white'
            placeholder='Describe the issue'
            required
            maxLength={MAX_CHARACTERS}
          ></textarea>
          <span className='absolute bottom-2 right-2 text-gray-400'>
            {charactersLeft} characters left
          </span>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          onClick={onSubmitReport}
          type='button'
          className='rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'
        >
          <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-12 opacity-10'></span>
          <span className='relative'>Send Report</span>
        </Button>
      </div>
    </motion.section>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { jwt_refresh } = req.cookies;
  try {
    const { projectId } = params as ParsedUrlQuery;
    const payload = getPayloadFromToken(jwt_refresh);
    const project_id = projectId?.toString().replace('~', '');
    if (payload) {
      const projectData = await axiosInstance.get('/api/project/', {
        data: {
          projectId: project_id,
          userId: payload.sub,
        },
      });
      const project: IProject = projectData.data.project;
      let targetId;
      switch (payload.sub) {
        case project.Freelancer_id:
          targetId = project.client_id;
          break;
        case project.client_id:
          targetId = project.Freelancer_id;
          break;
        default:
          targetId = null;
          break;
      }
      if (project.project_status !== 'Complete') {
        return { redirect: { destination: '/', permanent: false } };
      }
      if (!targetId || !project || !payload?.sub) {
        return { redirect: { destination: '/', permanent: false } };
      }
      return {
        props: {
          project,
          userId: payload.sub,
          targetId,
        },
      };
    }
    return { redirect: { destination: '/404', permanent: false } };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Report;
