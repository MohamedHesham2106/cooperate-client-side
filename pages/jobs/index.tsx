import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';

import JobList from '../../components/Jobs/JobList';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';
import { fadeIn } from '../../utils/variants';

interface ICategoryWithSkills extends ICategory {
  skills: ISkill[];
}

interface ISelectedCheckboxes {
  [skill: string]: boolean;
}

interface IProps {
  jobs: IUser['jobs'];
  isFreelancer: 'freelancer' | 'client';
  categories: ICategoryWithSkills[];
}

const Jobs: NextPage<IProps> = ({ jobs, isFreelancer, categories }) => {
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
          <label className='md:text-sm text-xs flex gap-2'>
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
      <div
        key={category.name}
        className='flex flex-col p-3 lg:text-base text-sm'
      >
        <label className='text-center font-medium text bg-orange-400 rounded-md md:p-2 p-1 mb-4 text-white'>
          {category.name}
        </label>
        {childCheckboxes}
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
  const Fvariants = useMemo(() => fadeIn('right', 0.5), []);
  const Svariants = useMemo(() => fadeIn('left', 0.5), []);
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
      <Container className='mt-24 md:p-5 p-1 grid md:grid-cols-[1fr_4fr] grid-cols-[2fr_4fr] gap-2 h-[800px] scrollbar-hide overflow-y-scroll'>
        <motion.section
          variants={Fvariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.3 }}
          className=' border rounded-lg flex overflow-y-auto scrollbar-hide flex-col shadow relative'
        >
          <h2 className='font-medium text-sm md:text-lg text-center p-2 rounded-t-lg  bg-blue-500 shadow-md text-white sticky top-0'>
            Filter Jobs
          </h2>
          {parentCheckboxes}
        </motion.section>
        <motion.section
          variants={Svariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.3 }}
          className='border rounded-lg flex overflow-y-auto scrollbar-hide flex-col shadow p-5'
        >
          <JobList jobs={filteredJobs} isFreelancer={isFreelancer} />
        </motion.section>
      </Container>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;
  try {
    const [jobs, categories] = await Promise.all([
      (await axiosInstance.get('/api/job')).data,
      (await axiosInstance.get('/api/category')).data,
    ]);
    const payload = getPayloadFromToken(jwt_refresh);
    return {
      props: {
        jobs: jobs.jobs,
        categories: categories.categories,
        isFreelancer: payload.role === 'freelancer' ? 'freelancer' : 'client',
      },
    };
  } catch {
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default Jobs;
