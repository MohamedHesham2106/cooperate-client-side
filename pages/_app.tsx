import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import '../styles/globals.css';

import Layout from '../components/Layout/Layout';
import { useAppDispatch } from '../hooks/useRedux';
import { wrapper } from '../redux';
import actions from '../redux/actions';
import { getCookie, getPayloadFromToken } from '../utils/cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const { store } = wrapper.useWrappedStore(pageProps);

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

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default wrapper.withRedux(MyApp);
