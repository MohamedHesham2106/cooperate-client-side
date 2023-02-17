import Layout from 'components/Layout/Layout';
import { useAppDispatch } from 'hooks/useRedux';
import { getCookie } from 'lib/cookie';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import actions from 'redux/actions';

import '../styles/globals.css';

import { wrapper } from '../redux';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const { store } = wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    const access = getCookie('jwt_access');
    const refresh = getCookie('jwt_refresh');
    dispatch(actions.reauthenticate(refresh, access));
    if (!refresh) {
      dispatch(actions.deauthenticate());
    }
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
