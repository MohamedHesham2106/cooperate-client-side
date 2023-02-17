import About from 'components/UI/About/About';
import Hero from 'components/UI/Hero/Hero';
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
// ? export const getServerSideProps: GetServerSideProps = (
//   ctx: GetServerSidePropsContext
// ):Promise<GetServerSidePropsResult<any>> => {
//   const req = ctx.req;
//   const cookie = req.cookies;
//   console.log(cookie.jwt_access);
//   return {
//     props: {},
//   };
// };

export default Home;
