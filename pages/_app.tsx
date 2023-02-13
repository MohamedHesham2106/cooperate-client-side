import Layout from 'components/Layout/Layout';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import '../styles/globals.css';

import { wrapper } from '../redux';
import actions from '../redux/actions';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const { store } = wrapper.useWrappedStore(pageProps);
  useEffect(() => {
    dispatch(actions.reauthenticate());
  }, [dispatch]);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
