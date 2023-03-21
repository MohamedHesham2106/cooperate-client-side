import { NextPage } from 'next';
import { Fragment } from 'react';

import About from '../components/About/About';
import Hero from '../components/Hero/Hero';
import Head from 'next/head';
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
    </Fragment>
  );
};

export default Home;
