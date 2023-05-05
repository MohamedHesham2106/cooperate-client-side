import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { GoSettings } from 'react-icons/go';
import useSWR from 'swr';

import JobList from '../../components/Jobs/JobList';
import Button from '../../components/UI/Button';
import Container from '../../components/UI/Container';
import Modal from '../../components/UI/Modal';
import { useAuthenticate } from '../../context/AuthProvider';
import axiosInstance, { fetcher } from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

interface ICategoryWithSkills extends ICategory {
  skills: ISkill[];
}

interface ISelectedCheckboxes {
  [skill: string]: boolean;
}

interface IProps {
  isFreelancer: 'freelancer' | 'client';
  categories: ICategoryWithSkills[];
}

const FreelancerRecommendation: NextPage<IProps> = ({
  isFreelancer,
  categories,
}) => {
  const { uuid } = useAuthenticate();
  const { data } = useSWR(`/api/machine/recommendation/${uuid}`, fetcher, {
    refreshInterval: 30 * 60 * 1000,
  });

  const [selectedCheckboxes, setSelectedCheckboxes] =
    useState<ISelectedCheckboxes>(
      categories.reduce(
        (acc, category) => ({
          ...acc,
          ...category.skills.reduce(
            (acc2, skill) => ({ ...acc2, [skill.name]: false }),
            {}
          ),
        }),
        {}
      )
    );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (skill: string) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(
      (router.query.skills as string)?.replace(/,/g, '&')
    );
    const selectedSkills: ISelectedCheckboxes = {};

    categories.forEach((category) => {
      category.skills.forEach((skill) => {
        const isChecked = queryParams.has(skill.name);
        selectedSkills[skill.name] = isChecked;
      });
    });

    setSelectedCheckboxes(selectedSkills);
  }, [categories, router.query.skills]);

  const parentCheckboxes = categories.map((category) => {
    const childCheckboxes = category.skills.map((skill) => {
      const isChecked = selectedCheckboxes[skill.name];
      return (
        <div key={skill.name} className='ml-5 '>
          <label className='flex gap-2 text-sm '>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={() => handleCheckboxChange(skill.name)}
            />
            {skill.name}
          </label>
        </div>
      );
    });

    return (
      <div key={category.name} className='flex flex-col p-3'>
        <label className='text-center font-bold text bg-blue-200 rounded-sm md:p-2 p-1 mb-4 text-black dark:text-white dark:bg-gray-800'>
          {category.name}
        </label>
        <div className='grid grid-cols-3'>{childCheckboxes}</div>
      </div>
    );
  });

  let filteredJobs = [];
  if (data) {
    filteredJobs = data.jobs;
    const selectedSkills = Object.entries(selectedCheckboxes)
      .filter(([_, isChecked]) => isChecked)
      .map(([skill]) => skill);

    if (selectedSkills.length > 0) {
      filteredJobs = data.jobs?.filter((job: IJobs) =>
        selectedSkills.every((skill) =>
          job.skills.some((jobSkill) => jobSkill.name === skill)
        )
      );
    }
  }

  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <Head>
        <title>
          COO/RATE | All Jobs Posted - Freelance Projects in Your Field
        </title>
        <meta
          name='description'
          content='Find the latest freelance projects in your field on COO/RATE. Browse all jobs posted by high-quality clients and start working on your next project today.'
        />
        <meta
          name='keywords'
          content='COO/RATE, freelance, jobs, projects, clients'
        />
      </Head>
      {isModalOpen && (
        <Modal onClose={closeModalHandler} className='' Side>
          <h2 className='font-black text-3xl text-center p-2 rounded-sm bg-blue-500 shadow-md dark:bg-gray-900 text-white'>
            Filter Jobs
          </h2>
          {parentCheckboxes}
        </Modal>
      )}
      <Container className='mt-24 md:p-5 p-1 flex flex-col w-11/12 mx-auto  gap-5 max-h-[2000px] scrollbar-hide overflow-y-scroll border rounded-md shadow m-10 dark:bg-gray-700 dark:border-gray-900'>
        <h1 className=' py-10  text-3xl pl-5 border-b-2  dark:text-white font-bold  '>
          Jobs you might like
        </h1>
        <div className='flex justify-end'>
          <Button
            onClick={openModalHandler}
            className='rounded relative inline-flex font-bold group items-center justify-center px-10 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'
          >
            <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-12 opacity-10'></span>
            <span className='relative flex gap-2 items-center'>
              <GoSettings size={20} /> Filter
            </span>
          </Button>
        </div>

        <motion.section
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className='border dark:border-none dark:bg-gray-800 rounded-lg flex overflow-y-auto scrollbar-hide flex-col shadow p-5'
        >
          <JobList jobs={filteredJobs} isFreelancer={isFreelancer} />
        </motion.section>
      </Container>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh, uuid } = req.cookies;
  try {
    const categories = (await axiosInstance.get('/api/category')).data;

    const payload = getPayloadFromToken(jwt_refresh);
    const isFreelancer =
      payload?.role === 'freelancer' ? 'freelancer' : 'client';
    if (!isFreelancer || uuid !== payload.sub) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    return {
      props: {
        categories: categories.categories,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default FreelancerRecommendation;