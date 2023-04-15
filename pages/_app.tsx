import { Mulish, Philosopher } from '@next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Fragment, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import Layout from '../components/Layout/Layout';
import Spinner from '../components/UI/Spinner';
import AuthProvider from '../context/AuthProvider';
import { ModalManagerProvider } from '../context/ModalManager';
import { NotificationProvider } from '../context/NotificationProvider';
import { SocketProvider } from '../context/SocketContext';

const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});
const muli = Mulish({
  subsets: ['latin'],
  weight: ['200', '300', '600', '500', '600', '700', '800', '900'],
  display: 'swap',
});
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

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
      <Head>
        <title>COO/RATE | Find the Best Freelancers for Your Projects</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link rel='icon' type='image/png' href='/favicon.ico' />
      </Head>
      <style jsx global>
        {`
          :root {
            --philosopher-font: ${philosopher.style.fontFamily};
            --muli-font: ${muli.style.fontFamily};
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
            <ThemeProvider enableSystem={false} attribute='class'>
              <NotificationProvider>
                <ModalManagerProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ModalManagerProvider>
              </NotificationProvider>
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      )}
    </Fragment>
  );
}
export default MyApp;
