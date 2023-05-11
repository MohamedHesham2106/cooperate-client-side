import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useState } from 'react';

import RecentJobs from '../../components/Jobs/RecentJobs';
import RecommendedJobs from '../../components/Jobs/RecommendedJobs';
import Button from '../../components/UI/Button';
import Container from '../../components/UI/Container';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

interface ICategoryWithSkills extends ICategory {
  skills: ISkill[];
}

interface IProps {
  categories: ICategoryWithSkills[];
}

const FreelancerRecommendation: NextPage<IProps> = ({ categories }) => {
  const [showRec, setShowRec] = useState<boolean>(true);

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

      <Container className='mt-24 md:p-5 p-1 flex flex-col w-11/12 mx-auto  gap-5 border rounded-md shadow m-10 dark:bg-gray-700 dark:border-gray-900'>
        <h1 className=' py-10  text-3xl pl-5 dark:text-white font-bold  '>
          Jobs you might like
        </h1>
        <ul className='flex flex-wrap w-full gap-2 bg-white dark:bg-gray-700 border-b'>
          <li>
            <Button
              onClick={() => setShowRec(true)}
              className={`inline-block font-bold p-4 ${
                showRec
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : ' hover:text-gray-600 hover:border-gray-300'
              }   rounded-t-lg `}
            >
              Best Matches
            </Button>
          </li>
          <li>
            <Button
              onClick={() => setShowRec(false)}
              className={`inline-block font-bold p-4 ${
                !showRec
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : ' hover:text-gray-600 hover:border-gray-300'
              }   rounded-t-lg `}
            >
              Most Recent
            </Button>
          </li>
        </ul>

        {showRec ? (
          <RecommendedJobs categories={categories} />
        ) : (
          <RecentJobs categories={categories} />
        )}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh, uuid } = req.cookies;
  try {
    const categories = (await axiosInstance.get('/api/category')).data;

    const payload = getPayloadFromToken(jwt_refresh);

    if (payload?.role !== 'freelancer' || uuid !== payload?.sub) {
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
