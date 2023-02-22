import About from 'components/About/About';
import Hero from 'components/Hero/Hero';
import { NextPage } from 'next';
import { Fragment } from 'react';
const Home: NextPage = () => {
  return (
    <Fragment>
      <Hero />
      <About />
    </Fragment>
  );
};

export default Home;
