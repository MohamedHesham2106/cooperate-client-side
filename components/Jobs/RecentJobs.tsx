import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { GoSettings } from 'react-icons/go';
import useSWRInfinite from 'swr/infinite';

import JobList from './JobList';
import TailwindSpinner from '../SVG/TailwindSpinner';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { fetcher } from '../../utils/axios';
interface ICategoryWithSkills extends ICategory {
  skills: ISkill[];
}

interface ISelectedCheckboxes {
  [skill: string]: boolean;
}

interface IProps {
  categories: ICategoryWithSkills[];
  isFreelancer?: 'freelancer' | 'client';
  isOwnProfile?: boolean;
}
const RecentJobs: React.FC<IProps> = ({
  categories,
  isOwnProfile = false,
  isFreelancer = 'freelancer',
}) => {
  const PAGE_SIZE = 10; // Number of items per page
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getKey = (pageIndex: number, previousPageData: any) => {
    console.log('getKey called:', pageIndex);
    if (previousPageData && !previousPageData.jobs.length) return null;
    if (pageIndex === 0) return `/api/job?per_page=${PAGE_SIZE}&page=1`;
    return `/api/job?per_page=${PAGE_SIZE}&page=${pageIndex + 1}`; // SWR key
  };

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);
  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoadingMore(true);
    const nextPageIndex = size + 1;
    setSize(nextPageIndex);
  };
  useEffect(() => {
    if (!isValidating) {
      setIsLoadingMore(false); // Set isLoadingMore back to false when done loading
    }
  }, [isValidating]);
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
  const flattenedData: { jobs: IJobs[] }[] = data ? data.flat() : [];
  let filteredJobs: IJobs[] = [];
  if (flattenedData) {
    filteredJobs = flattenedData.flatMap((data) => data.jobs);
    const selectedSkills = Object.entries(selectedCheckboxes)
      .filter(([_, isChecked]) => isChecked)
      .map(([skill]) => skill);

    if (selectedSkills.length > 0) {
      filteredJobs = flattenedData.flatMap((data) =>
        data.jobs.filter((job) =>
          selectedSkills.every((skill) =>
            job.skills.some((jobSkill) => jobSkill.name === skill)
          )
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
      {isModalOpen && (
        <Modal onClose={closeModalHandler} className='' Side>
          <h2 className='font-black text-3xl text-center p-2 rounded-sm bg-blue-500 shadow-md dark:bg-gray-900 text-white'>
            Filter Jobs
          </h2>
          {parentCheckboxes}
        </Modal>
      )}
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
        className='border dark:border-none dark:bg-gray-800 rounded-lg flex overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex-col shadow p-5'
      >
        <JobList
          jobs={filteredJobs}
          isFreelancer={isFreelancer}
          isOwnProfile={isOwnProfile}
        />
        {!isLoadingMore ? (
          <Button
            className='bg-gray-200 text-sm rounded-sm p-3 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800'
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        ) : (
          <div className='bg-gray-200 text-sm rounded-sm p-3 hover:bg-gray-300 text-center flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-800'>
            <TailwindSpinner />
          </div>
        )}
      </motion.section>
    </Fragment>
  );
};

export default RecentJobs;
