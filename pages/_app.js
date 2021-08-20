import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { parseCookies, destroyCookie } from 'nookies';

import Head from '../components/Head';
import Layout from '../components/Layout';

import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import baseURL from '../utils/baseURL';
import { redirectUser } from '../utils/auth';

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <ToastContainer />
      <Head title={pageProps.title} />
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === '/feed' || ctx.pathname === '/notifications';
  const availableForEveryone =
    ctx.pathname === '/' ||
    ctx.pathname === '/home' ||
    ctx.pathname === '/onboarding';

  // If user is not logged in
  if (!token) {
    destroyCookie(ctx, 'token');
    // Redirect to login if user is trying to access protected routes
    protectedRoutes && redirectUser(ctx, '/login');
  } else {
    try {
      const res = await axios.get(`${baseURL}/api/auth`, {
        headers: { Authorization: token },
      });
      const { user } = res.data;
      if (user && !availableForEveryone) {
        !protectedRoutes && redirectUser(ctx, '/home');
      }
      pageProps.user = user;
    } catch (err) {
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/login');
    }
  }

  return { pageProps };
};

export default MyApp;
