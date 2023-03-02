import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import '../styles/globals.css';

import Layout from '../components/Layout/Layout';
import Spinner from '../components/UI/Spinner';
import { useAppDispatch } from '../hooks/useRedux';
import { wrapper } from '../redux';
import actions from '../redux/actions';
import { getCookie, getPayloadFromToken } from '../utils/cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const { store } = wrapper.useWrappedStore(pageProps);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const access = getCookie('jwt_access');
    const refresh = getCookie('jwt_refresh');

    // Check if access token is expired
    if (access) {
      const decodedToken = getPayloadFromToken(access);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        window.location.reload();
      }
    }
    dispatch(actions.reauthenticate(refresh, access));
    if (!refresh) {
      dispatch(actions.deauthenticate());
    }
  }, [dispatch]);
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
      {loading ? (
        <div className='h-screen flex flex-col justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      )}
    </Fragment>
  );
}
export default wrapper.withRedux(MyApp);
