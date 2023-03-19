import { Open_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import Layout from '../components/Layout/Layout';
import Spinner from '../components/UI/Spinner';
import AuthProvider from '../context/AuthProvider';
import { SocketProvider } from '../context/SocketContext';

const opensans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
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
      <style jsx global>
        {`
          :root {
            --opensans-font: ${opensans.style.fontFamily};
          }
        `}
      </style>
      <Toaster position='top-right' reverseOrder={false} />
      {loading ? (
        <div className='h-screen flex flex-col justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <AuthProvider>
          <SocketProvider url='http://localhost:8080/'>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SocketProvider>
        </AuthProvider>
      )}
    </Fragment>
  );
}
export default MyApp;
