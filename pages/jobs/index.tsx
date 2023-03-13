import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import JobList from '../../components/Jobs/JobList';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

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

  const handleCheckboxChange = (skill: string) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }));
  };

  const parentCheckboxes = categories.map((category) => {
    const childCheckboxes = category.skills.map((skill) => {
      const isChecked = selectedCheckboxes[skill.name];
      return (
        <div key={skill.name} className='ml-5 '>
          <label className='text-sm flex gap-2'>
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
        <label className='text-center font-medium text bg-orange-400 rounded-md p-2 mb-4 text-white'>
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

  return (
    <Container className='mt-24 p-5 grid grid-cols-[1fr_4fr] gap-2 h-[800px] scrollbar-hide overflow-y-scroll'>
      <section className=' border rounded-lg flex overflow-y-auto scrollbar-hide flex-col shadow'>
        <h2 className='font-medium text-lg text-center p-2 rounded-t-lg  bg-blue-500 text-white'>
          Filter Jobs
        </h2>
        {parentCheckboxes}
      </section>
      <section className='border rounded-lg flex overflow-y-auto scrollbar-hide flex-col shadow p-5'>
        <JobList jobs={filteredJobs} isFreelancer={isFreelancer} />
      </section>
    </Container>
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
