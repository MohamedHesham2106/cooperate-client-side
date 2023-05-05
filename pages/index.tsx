import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import About from '../components/About/About';
import Hero from '../components/Hero/Hero';
import SkillsList from '../components/Skills/SkillsList';
import { getPayloadFromToken } from '../utils/cookie';
const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>COO/RATE | Hire and Work with the Best Freelancers</title>
        <meta
          name='description'
          content='COO/RATE is a freelancing platform that connects businesses with top freelance talent from around the world. Find skilled professionals for any project, and get your work done on time and on budget.'
        />
        <meta
          name='keywords'
          content='COO/RATE, freelancing platform, hire freelancers, work with freelancers, top talent, skilled professionals, project management'
        />
      </Head>
      <Hero />
      <About />
      <SkillsList />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt_refresh } = req.cookies;

  const role = getPayloadFromToken(jwt_refresh)?.role;
  if (role && role === 'admin') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true,
      },
    };
  }
  if (role && role === 'freelancer') {
    return {
      redirect: {
        destination: '/freelancer',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
export default Home;
