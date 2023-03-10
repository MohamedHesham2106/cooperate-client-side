import { Roboto } from '@next/font/google';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import Layout from '../components/Layout/Layout';
import Spinner from '../components/UI/Spinner';
import AuthProvider from '../context/AuthProvider';
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
});
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <Fragment>
      <Toaster position='top-right' reverseOrder={false} />
      {loading ? (
        <div className='h-screen flex flex-col justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <AuthProvider>
          <Layout font={roboto.className}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      )}
    </Fragment>
  );
}
export default MyApp;
