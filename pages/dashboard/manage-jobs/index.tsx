import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { GoSettings } from 'react-icons/go';
import useSWR from 'swr';

import JobList from '../../../components/Jobs/JobList';
import Button from '../../../components/UI/Button';
import Container from '../../../components/UI/Container';
import Modal from '../../../components/UI/Modal';
import axiosInstance, { fetcher } from '../../../utils/axios';
import { getPayloadFromToken } from '../../../utils/cookie';
import { fadeIn } from '../../../utils/variants';

interface ICategoryWithSkills extends ICategory {
  skills: ISkill[];
}

interface ISelectedCheckboxes {
  [skill: string]: boolean;
}

interface IProps {
  categories: ICategoryWithSkills[];
}
const ManageJobs: NextPage<IProps> = ({ categories }) => {
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const { data } = useSWR('/api/job', fetcher, {
    refreshInterval: 60000,
  });
  const handleNewData = (newData: IJobs[]) => {
    setJobs(newData);
  };

  useEffect(() => {
    if (data) {
      handleNewData(data.jobs);
    }
  }, [data]);
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
        <label className='text-center font-bold text bg-blue-200 rounded-sm md:p-2 p-1 mb-4 text-black'>
          {category.name}
        </label>
        <div className='grid grid-cols-3'>{childCheckboxes}</div>
      </div>
    );
  });

  let filteredJobs = jobs;

  const selectedSkills = Object.entries(selectedCheckboxes)
    .filter(([_, isChecked]) => isChecked)
    .map(([skill]) => skill);

  if (selectedSkills.length > 0) {
    filteredJobs = jobs?.filter((job) =>
      selectedSkills.every((skill) =>
        job.skills.some((jobSkill) => jobSkill.name === skill)
      )
    );
  }
  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  const variants = useMemo(() => fadeIn('down', 0.5), []);
  return (
    <Fragment>
      {isModalOpen && (
        <Modal onClose={closeModalHandler} className='' Side>
          <h2 className='font-black text-3xl text-center p-2 rounded-sm bg-blue-500 shadow-md dark:bg-gray-900 text-white'>
            Filter Jobs
          </h2>
          {parentCheckboxes}
        </Modal>
      )}
      <Container className='mt-24 md:p-5 p-1 flex flex-col gap-2 h-[800px] scrollbar-hide overflow-y-scroll'>
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
          variants={variants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.3 }}
          className='border dark:border-none dark:bg-gray-800 rounded-lg flex overflow-y-auto scrollbar-hide flex-col shadow p-5'
        >
          <JobList
            jobs={filteredJobs}
            isFreelancer={undefined}
            isOwnProfile={true}
          />
        </motion.section>
      </Container>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;
  try {
    const role = getPayloadFromToken(jwt_refresh).role;
    if (role !== 'admin') {
      return { redirect: { destination: '/404', permanent: false } };
    }
    const { data: categories } = await axiosInstance.get('/api/category');
    return {
      props: {
        categories: categories.categories,
      },
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default ManageJobs;
